<?php
/**
 * Formulario de contacto de CumbresDev (cumbresdev.cl) para hosting cPanel.
 *
 * Recibe el formulario por POST, lo valida y lo envía por correo con mail().
 * Responde JSON: { "success": bool, "message": string, "errors"?: { campo: mensaje } }
 *
 * Configuración de correos:
 *  - CONTACT_TO:   casilla que recibe las solicitudes.
 *  - CONTACT_FROM: casilla creada en cPanel en el MISMO dominio (ej. contacto@cumbresdev.cl),
 *                  necesaria para que el correo no sea rechazado como spam (SPF/DKIM).
 * Mientras estén vacíos, el formulario informa que el envío no está disponible.
 */

const CONTACT_TO = 'contacto@cumbresdev.cl';
const CONTACT_FROM = 'contacto@cumbresdev.cl';
const CONTACT_FROM_NAME = 'CumbresDev';

const MIN_FILL_SECONDS = 3;      // envíos más rápidos se consideran automáticos
const RATE_LIMIT_MAX = 5;        // máximo de envíos por IP...
const RATE_LIMIT_WINDOW = 600;   // ...en esta cantidad de segundos

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($status, $success, $message, $errors = null)
{
    http_response_code($status);
    $payload = [
        'success' => $success,
        'message' => $message
    ];
    if ($errors) {
        $payload['errors'] = $errors;
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function post_value($key, $limit)
{
    if (!isset($_POST[$key]) || !is_string($_POST[$key])) {
        return '';
    }

    $value = trim(strip_tags(str_replace("\0", '', $_POST[$key])));
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $limit, 'UTF-8');
    }

    return substr($value, 0, $limit);
}

/** Valor de una sola línea: elimina saltos de línea (evita inyección de cabeceras). */
function single_line($value)
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $value));
}

function text_length($value)
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function encode_header($text)
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($text, 'UTF-8', 'B', "\r\n");
    }
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

/** Límite simple de envíos por IP usando un archivo temporal. */
function rate_limited($ip)
{
    $file = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'cumbresdev_contacto_' . md5($ip);
    $now = time();
    $hits = [];

    $handle = @fopen($file, 'c+');
    if (!$handle) {
        return false; // si no se puede escribir, no bloquear
    }
    flock($handle, LOCK_EX);
    $content = stream_get_contents($handle);
    if ($content) {
        foreach (explode(',', $content) as $t) {
            if ((int) $t > $now - RATE_LIMIT_WINDOW) {
                $hits[] = (int) $t;
            }
        }
    }
    $hits[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, implode(',', $hits));
    flock($handle, LOCK_UN);
    fclose($handle);

    return count($hits) > RATE_LIMIT_MAX;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Método no permitido.');
}

// Antispam: campo trampa invisible para personas.
if (post_value('website', 200) !== '') {
    respond(200, true, 'Solicitud enviada. Te contactaremos pronto.');
}

// Antispam: tiempo mínimo entre la carga del formulario y el envío (timestamp en ms).
$startedAt = isset($_POST['startedAt']) ? (float) $_POST['startedAt'] : 0;
if ($startedAt <= 0 || (microtime(true) * 1000 - $startedAt) < MIN_FILL_SECONDS * 1000) {
    respond(400, false, 'El formulario se envió demasiado rápido. Revisa los datos y vuelve a intentarlo.');
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'desconocida';
if (rate_limited($ip)) {
    respond(429, false, 'Recibimos varios envíos seguidos desde tu conexión. Espera unos minutos e inténtalo nuevamente.');
}

$types = [
    'web' => 'Página web',
    'software' => 'Software a medida'
];

$name = single_line(post_value('nombre', 80));
$company = single_line(post_value('empresa', 100));
$email = single_line(post_value('email', 120));
$phone = single_line(post_value('telefono', 20));
$type = post_value('tipo', 20);
$description = post_value('descripcion', 3000);
$budget = single_line(post_value('presupuesto', 100));
$timeline = single_line(post_value('plazo', 100));
$consent = post_value('consentimiento', 5);

$errors = [];
if (text_length($name) < 2) {
    $errors['nombre'] = 'Ingresa tu nombre.';
}
if ($email === '') {
    $errors['email'] = 'Ingresa tu correo electrónico.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Ingresa un correo válido, por ejemplo nombre@empresa.cl.';
}
if ($phone !== '' && !preg_match('/^\+?[\d\s()\-]{8,20}$/', $phone)) {
    $errors['telefono'] = 'Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.';
}
if (!isset($types[$type])) {
    $errors['tipo'] = 'Selecciona el tipo de proyecto.';
}
if (text_length($description) < 20) {
    $errors['descripcion'] = 'Cuéntanos un poco más (mínimo 20 caracteres).';
}
if ($consent !== '1') {
    $errors['consentimiento'] = 'Debes aceptar la política de privacidad para enviar el formulario.';
}
if ($errors) {
    respond(422, false, 'Revisa los campos marcados.', $errors);
}

if (CONTACT_TO === '' || CONTACT_FROM === '') {
    error_log('[cumbresdev] Formulario sin configurar: completa CONTACT_TO y CONTACT_FROM en enviar-contacto.php');
    respond(503, false, 'El envío del formulario aún no está habilitado. Tu mensaje no fue enviado; por favor, contáctanos por otro medio.');
}

$body = implode("\n", [
    'Nueva solicitud desde cumbresdev.cl',
    '',
    'Nombre: ' . $name,
    'Empresa: ' . ($company !== '' ? $company : 'No indicada'),
    'Correo electrónico: ' . $email,
    'Teléfono: ' . ($phone !== '' ? $phone : 'No indicado'),
    'Tipo de proyecto: ' . $types[$type],
    'Presupuesto estimado: ' . ($budget !== '' ? $budget : 'No indicado'),
    'Plazo deseado: ' . ($timeline !== '' ? $timeline : 'No indicado'),
    'Consentimiento de privacidad: Aceptado',
    '',
    'Descripción:',
    $description
]);

$headers = [
    'From: ' . encode_header(CONTACT_FROM_NAME) . ' <' . CONTACT_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion()
];

$sent = mail(
    CONTACT_TO,
    encode_header('Nueva solicitud: ' . $types[$type] . ' — ' . $name),
    $body,
    implode("\r\n", $headers),
    '-f' . CONTACT_FROM
);

if (!$sent) {
    respond(500, false, 'No se pudo enviar el correo. Inténtalo nuevamente más tarde.');
}

respond(200, true, 'Solicitud enviada. Te contactaremos pronto.');
