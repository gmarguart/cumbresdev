"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Code2, Loader2, MonitorSmartphone, Send } from "lucide-react";
import {
  BUDGET_OPTIONS,
  emptyContact,
  LIMITS,
  PROJECT_TYPES,
  TIMELINE_OPTIONS,
  validateContact,
  type ContactData,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import type { ProjectType } from "@/config/content";
import { SELECT_PROJECT_EVENT } from "@/components/ui/ProjectCta";
import { PrivacyLink } from "@/components/PrivacyDialog";
import { buttonClasses } from "@/components/ui/Button";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

/** Script PHP que procesa el formulario (public/enviar-contacto.php, copiado a out/ al compilar). */
const CONTACT_ENDPOINT = "enviar-contacto.php";
const GENERIC_ERROR = "No pudimos enviar tu mensaje. Verifica tu conexión e inténtalo nuevamente.";

const ORDER: ContactField[] = ["nombre", "empresa", "email", "telefono", "tipo", "descripcion", "presupuesto", "plazo", "consentimiento"];

const inputBase =
  "block w-full rounded-xl border bg-white px-4 py-3 text-navy-950 placeholder:text-navy-400 transition-[border-color,box-shadow] focus:outline-none focus:ring-4";
const inputOk = "border-navy-200 hover:border-navy-300 focus:border-brand-500 focus:ring-brand-500/15";
const inputErr = "border-red-500 focus:border-red-500 focus:ring-red-500/15";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-navy-900">
        <span>
          {label}
          {!optional && <span aria-hidden="true" className="text-brand-600"> *</span>}
        </span>
        {optional && <span className="text-xs font-normal text-navy-500">Opcional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-navy-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactData>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Preselección del tipo de proyecto desde los botones de la página.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const type = (e as CustomEvent<ProjectType>).detail;
      if (type in PROJECT_TYPES) {
        setValues((v) => ({ ...v, tipo: type }));
        setErrors((er) => ({ ...er, tipo: undefined }));
      }
    };
    window.addEventListener(SELECT_PROJECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PROJECT_EVENT, onSelect);
  }, []);

  function update<K extends ContactField>(field: K, value: ContactData[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  }

  function focusFirstError(errs: ContactErrors) {
    const first = ORDER.find((f) => errs[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(first === "tipo" ? '[name="tipo"]' : `#cf-${first}`);
    el?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ kind: "error", message: "Revisa los campos marcados antes de enviar." });
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const d = result.data;
      // Envío como formulario clásico (application/x-www-form-urlencoded) para que PHP lo lea en $_POST.
      const body = new URLSearchParams({
        nombre: d.nombre,
        empresa: d.empresa,
        email: d.email,
        telefono: d.telefono,
        tipo: d.tipo,
        descripcion: d.descripcion,
        presupuesto: d.presupuesto,
        plazo: d.plazo,
        consentimiento: d.consentimiento ? "1" : "",
        website: honeypot,
        startedAt: String(startedAt.current),
      });
      const res = await fetch(CONTACT_ENDPOINT, { method: "POST", body, headers: { Accept: "application/json" } });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        errors?: ContactErrors;
      };

      // Solo se informa éxito si el servidor confirmó el envío del correo.
      if (res.ok && json.success === true) {
        setStatus({ kind: "success" });
        setValues(emptyContact);
        startedAt.current = Date.now();
      } else {
        if (json.errors) {
          setErrors(json.errors);
          focusFirstError(json.errors);
        }
        setStatus({ kind: "error", message: json.message || GENERIC_ERROR });
      }
    } catch {
      setStatus({ kind: "error", message: GENERIC_ERROR });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const describedBy = (f: ContactField, hint = false) =>
    errors[f] ? `cf-${f}-error` : hint ? `cf-${f}-hint` : undefined;

  if (status.kind === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center focus:outline-none"
      >
        <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-2xl font-bold">¡Mensaje enviado!</h3>
        <p className="mt-2 max-w-md text-navy-600">
          Gracias por escribirnos. Revisaremos tu solicitud y te responderemos al correo que indicaste.
        </p>
        <button
          type="button"
          className={buttonClasses("secondary", "md", "mt-6")}
          onClick={() => setStatus({ kind: "idle" })}
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="cf-required-note" className="space-y-5">
      <p id="cf-required-note" className="text-sm text-navy-500">
        Los campos marcados con <span className="text-brand-600">*</span> son obligatorios.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-nombre" label="Nombre" error={errors.nombre}>
          <input
            id="cf-nombre"
            name="nombre"
            autoComplete="name"
            maxLength={LIMITS.nombre}
            value={values.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            aria-invalid={!!errors.nombre}
            aria-describedby={describedBy("nombre")}
            required
            className={`${inputBase} ${errors.nombre ? inputErr : inputOk}`}
          />
        </Field>
        <Field id="cf-empresa" label="Empresa" optional error={errors.empresa}>
          <input
            id="cf-empresa"
            name="empresa"
            autoComplete="organization"
            maxLength={LIMITS.empresa}
            value={values.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            aria-invalid={!!errors.empresa}
            aria-describedby={describedBy("empresa")}
            className={`${inputBase} ${errors.empresa ? inputErr : inputOk}`}
          />
        </Field>
        <Field id="cf-email" label="Correo electrónico" error={errors.email}>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            required
            className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
          />
        </Field>
        <Field id="cf-telefono" label="Teléfono" optional error={errors.telefono}>
          <input
            id="cf-telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.telefono}
            placeholder="+56 9 1234 5678"
            value={values.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            aria-invalid={!!errors.telefono}
            aria-describedby={describedBy("telefono")}
            className={`${inputBase} ${errors.telefono ? inputErr : inputOk}`}
          />
        </Field>
      </div>

      <fieldset aria-describedby={errors.tipo ? "cf-tipo-error" : undefined}>
        <legend className="mb-1.5 text-sm font-semibold text-navy-900">
          Tipo de proyecto<span aria-hidden="true" className="text-brand-600"> *</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(PROJECT_TYPES) as ProjectType[]).map((type) => {
            const Icon = type === "web" ? MonitorSmartphone : Code2;
            const checked = values.tipo === type;
            return (
              <label
                key={type}
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-[border-color,background-color,box-shadow] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-500/20 ${
                  checked
                    ? "border-brand-600 bg-brand-50 shadow-[inset_0_0_0_1px_var(--color-brand-600)]"
                    : errors.tipo
                      ? "border-red-500 bg-white"
                      : "border-navy-200 bg-white hover:border-navy-300"
                }`}
              >
                <input
                  type="radio"
                  name="tipo"
                  value={type}
                  checked={checked}
                  onChange={() => update("tipo", type)}
                  className="sr-only"
                />
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    checked ? "bg-brand-600 text-white" : "bg-navy-50 text-navy-600"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-semibold text-navy-900">{PROJECT_TYPES[type]}</span>
                <span
                  aria-hidden="true"
                  className={`ml-auto flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    checked ? "border-brand-600" : "border-navy-300"
                  }`}
                >
                  {checked && <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />}
                </span>
              </label>
            );
          })}
        </div>
        {errors.tipo && (
          <p id="cf-tipo-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {errors.tipo}
          </p>
        )}
      </fieldset>

      <Field
        id="cf-descripcion"
        label="Descripción de la necesidad"
        error={errors.descripcion}
        hint={`¿Qué necesitas, para quién es y qué problema resuelve? Mínimo ${LIMITS.descripcionMin} caracteres.`}
      >
        <textarea
          id="cf-descripcion"
          name="descripcion"
          rows={5}
          maxLength={LIMITS.descripcionMax}
          value={values.descripcion}
          onChange={(e) => update("descripcion", e.target.value)}
          aria-invalid={!!errors.descripcion}
          aria-describedby={describedBy("descripcion", true)}
          required
          className={`${inputBase} resize-y ${errors.descripcion ? inputErr : inputOk}`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-presupuesto" label="Presupuesto estimado" optional error={errors.presupuesto}>
          <select
            id="cf-presupuesto"
            name="presupuesto"
            value={values.presupuesto}
            onChange={(e) => update("presupuesto", e.target.value)}
            aria-invalid={!!errors.presupuesto}
            aria-describedby={describedBy("presupuesto")}
            className={`${inputBase} ${errors.presupuesto ? inputErr : inputOk}`}
          >
            <option value="">Selecciona una opción</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field id="cf-plazo" label="Plazo deseado" optional error={errors.plazo}>
          <select
            id="cf-plazo"
            name="plazo"
            value={values.plazo}
            onChange={(e) => update("plazo", e.target.value)}
            aria-invalid={!!errors.plazo}
            aria-describedby={describedBy("plazo")}
            className={`${inputBase} ${errors.plazo ? inputErr : inputOk}`}
          >
            <option value="">Selecciona una opción</option>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Campo trampa antispam: oculto para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">No completar este campo</label>
        <input
          id="cf-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="cf-consentimiento"
            name="consentimiento"
            type="checkbox"
            checked={values.consentimiento}
            onChange={(e) => update("consentimiento", e.target.checked)}
            aria-invalid={!!errors.consentimiento}
            aria-describedby={describedBy("consentimiento")}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-navy-300 accent-brand-600"
          />
          <label htmlFor="cf-consentimiento" className="text-sm leading-relaxed text-navy-700">
            Acepto el tratamiento de mis datos personales para responder esta solicitud, conforme a la{" "}
            <PrivacyLink className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800" />.
            <span aria-hidden="true" className="text-brand-600"> *</span>
          </label>
        </div>
        {errors.consentimiento && (
          <p id="cf-consentimiento-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {errors.consentimiento}
          </p>
        )}
      </div>

      {status.kind === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 focus:outline-none"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{status.message}</p>
        </div>
      )}

      <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            Enviar solicitud
            <Send aria-hidden="true" className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
