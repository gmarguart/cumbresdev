/**
 * CumbresDev — interacción de la landing page. JavaScript sin dependencias.
 *
 *  1. Año del pie de página
 *  2. Encabezado: fondo al hacer scroll, menú móvil y sección activa
 *  3. Carrusel principal
 *  4. Enlaces antiguos a la política de privacidad
 *  5. Formulario de contacto (envía a enviar-contacto.php)
 */
(function () {
  "use strict";

  /* 1. Año del pie de página ---------------------------------------------- */
  var year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* 2. Encabezado --------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var menuButton = header.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("menu-movil");

  function updateHeader() {
    // Fondo blanco al bajar o con el menú móvil abierto.
    header.classList.toggle("is-solid", window.scrollY > 16 || !mobileMenu.hidden);
  }

  function setMenu(open) {
    mobileMenu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    updateHeader();
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  menuButton.addEventListener("click", function () {
    setMenu(mobileMenu.hidden);
  });
  mobileMenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  header.querySelector(".logo").addEventListener("click", function () {
    setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !mobileMenu.hidden) setMenu(false);
  });

  // Resalta en el menú la sección visible.
  var navLinks = document.querySelectorAll("[data-nav]");
  var navIds = new Set(Array.prototype.map.call(navLinks, function (a) { return a.dataset.nav; }));
  // Todas las secciones (en orden del documento) más las tarjetas de servicio.
  var tracked = Array.prototype.slice.call(document.querySelectorAll("main section[id], #paginas-web, #software"));
  var order = tracked.map(function (el) { return el.id; });
  var visible = new Set();

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.dataset.nav === id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        if (visible.size === 0) return;
        // El elemento visible más específico (el último en el documento).
        // Si ambas tarjetas de servicio se ven a la vez (escritorio), se marca "Servicios".
        var current = visible.has("paginas-web") && visible.has("software")
          ? "servicios"
          : order.slice().reverse().find(function (id) { return visible.has(id); });
        // Secciones fuera del menú (beneficios, nosotros, FAQ) no marcan ningún enlace.
        setActive(current && navIds.has(current) ? current : "");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] }
    );
    tracked.forEach(function (el) { observer.observe(el); });
  }

  /* 3. Carrusel principal ------------------------------------------------- */
  var slider = document.getElementById("inicio");
  var slides = Array.prototype.slice.call(slider.querySelectorAll(".slide"));
  var dots = Array.prototype.slice.call(slider.querySelectorAll(".slider-dot"));
  var photos = Array.prototype.slice.call(slider.querySelectorAll(".hero-photo"));
  var toggle = slider.querySelector(".slider-toggle");
  var live = slider.querySelector(".slider-live");
  var INTERVAL = Number(slider.dataset.interval) || 5000;
  var SWIPE_THRESHOLD = 48;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var index = 0;
  var playPref = "auto"; // "auto" | "playing" | "paused"
  var hovered = false;
  var focusWithin = false;
  var timer = 0;
  var lastState = "";

  slider.style.setProperty("--slider-interval", INTERVAL + "ms");

  // Con "reducir movimiento" no hay rotación automática salvo que el usuario la active.
  function autoplay() {
    return playPref === "playing" || (playPref === "auto" && !reducedMotion.matches);
  }

  function isRunning() {
    return autoplay() && !hovered && !focusWithin && !document.hidden;
  }

  function render() {
    var running = isRunning();

    slides.forEach(function (slide, i) {
      var active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
      if (photos[i]) photos[i].classList.toggle("is-active", active);
    });
    dots.forEach(function (dot, i) {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    var playing = autoplay();
    toggle.querySelector(".icon-pause").hidden = !playing;
    toggle.querySelector(".icon-play").hidden = playing;
    toggle.querySelector(".slider-toggle-text").textContent = playing ? "Pausar rotación" : "Reanudar rotación";

    // Anuncia el cambio solo cuando no hay rotación automática.
    live.setAttribute("aria-live", running ? "off" : "polite");
    live.textContent = "Lámina " + (index + 1) + " de " + slides.length + ": " + slides[index].dataset.label;

    // Un único temporizador; se reinicia al cambiar de lámina o al pausar/reanudar.
    var state = index + "-" + running;
    if (state === lastState) return;
    lastState = state;

    slider.classList.toggle("is-running", running);
    var progress = dots[index].querySelector(".dot-progress");
    progress.style.animation = "none";
    void progress.offsetWidth; // reinicia la animación de la barra
    progress.style.animation = "";

    window.clearTimeout(timer);
    if (running) timer = window.setTimeout(next, INTERVAL);
  }

  function goTo(i) {
    index = ((i % slides.length) + slides.length) % slides.length;
    render();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  slider.querySelector('[data-slider="prev"]').addEventListener("click", prev);
  slider.querySelector('[data-slider="next"]').addEventListener("click", next);
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goTo(i); });
  });
  toggle.addEventListener("click", function () {
    playPref = autoplay() ? "paused" : "playing";
    render();
  });

  // Pausa con el puntero encima o con el foco dentro del carrusel.
  slider.addEventListener("mouseenter", function () { hovered = true; render(); });
  slider.addEventListener("mouseleave", function () { hovered = false; render(); });
  slider.addEventListener("focusin", function () { focusWithin = true; render(); });
  slider.addEventListener("focusout", function (e) {
    if (!slider.contains(e.relatedTarget)) {
      focusWithin = false;
      render();
    }
  });
  document.addEventListener("visibilitychange", render);
  reducedMotion.addEventListener("change", render);

  slider.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  });

  // Gesto táctil horizontal.
  var touchStart = null;
  slider.addEventListener("touchstart", function (e) {
    var t = e.touches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  slider.addEventListener("touchend", function (e) {
    var start = touchStart;
    touchStart = null;
    if (!start) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - start.x;
    var dy = t.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) next();
      else prev();
    }
  });

  render();

  /* 4. Enlaces antiguos a la política de privacidad ------------------------ */
  // La política ahora es una página propia; los enlaces viejos (#politica-de-privacidad) se redirigen.
  if (window.location.hash === "#politica-de-privacidad") {
    window.location.replace("privacidad.html");
  }

  /* 5. Formulario de contacto --------------------------------------------- */
  // enviar-contacto.php repite estas reglas en el servidor: si cambias una, actualiza ambas.
  var form = document.getElementById("contact-form");
  var success = document.getElementById("contact-success");
  var alertBox = document.getElementById("cf-alert");
  var submitButton = form.querySelector('[type="submit"]');

  var GENERIC_ERROR = "No pudimos enviar tu mensaje. Verifica tu conexión e inténtalo nuevamente.";
  var FIELDS = ["nombre", "empresa", "email", "telefono", "tipo", "descripcion", "presupuesto", "plazo", "consentimiento"];
  var PROJECT_TYPES = { web: "Página web", software: "Software a medida", asistente: "Asistente de WhatsApp con IA", consultoria: "Consultoría" };
  var LIMITS = { nombre: 80, empresa: 100, email: 120, descripcionMin: 20, descripcionMax: 3000 };
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^\+?[\d\s()-]{8,20}$/;
  var ERROR_ICON =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/>' +
    '<line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';

  var startedAt = Date.now();
  var submitting = false;

  function readValues() {
    var f = form.elements;
    return {
      nombre: f.nombre.value.trim(),
      empresa: f.empresa.value.trim(),
      email: f.email.value.trim().toLowerCase(),
      telefono: f.telefono.value.trim(),
      tipo: f.tipo.value,
      descripcion: f.descripcion.value.trim(),
      presupuesto: f.presupuesto.value,
      plazo: f.plazo.value,
      consentimiento: f.consentimiento.checked
    };
  }

  function isOption(select, value) {
    return Array.prototype.some.call(select.options, function (o) { return o.value === value; });
  }

  function validate(d) {
    var errors = {};

    if (d.nombre.length < 2) errors.nombre = "Ingresa tu nombre.";
    else if (d.nombre.length > LIMITS.nombre) errors.nombre = "Máximo " + LIMITS.nombre + " caracteres.";

    if (d.empresa.length > LIMITS.empresa) errors.empresa = "Máximo " + LIMITS.empresa + " caracteres.";

    if (!d.email) errors.email = "Ingresa tu correo electrónico.";
    else if (!EMAIL_RE.test(d.email) || d.email.length > LIMITS.email)
      errors.email = "Ingresa un correo válido, por ejemplo nombre@empresa.cl.";

    if (d.telefono && !PHONE_RE.test(d.telefono))
      errors.telefono = "Ingresa un teléfono válido, por ejemplo +56 9 1234 5678.";

    if (!PROJECT_TYPES[d.tipo]) errors.tipo = "Selecciona el tipo de proyecto.";

    if (d.descripcion.length < LIMITS.descripcionMin)
      errors.descripcion = "Cuéntanos un poco más (mínimo " + LIMITS.descripcionMin + " caracteres).";
    else if (d.descripcion.length > LIMITS.descripcionMax)
      errors.descripcion = "Máximo " + LIMITS.descripcionMax + " caracteres.";

    if (d.presupuesto && !isOption(form.elements.presupuesto, d.presupuesto))
      errors.presupuesto = "Selecciona una opción válida.";
    if (d.plazo && !isOption(form.elements.plazo, d.plazo)) errors.plazo = "Selecciona una opción válida.";

    if (!d.consentimiento) errors.consentimiento = "Debes aceptar la política de privacidad para enviar el formulario.";

    return errors;
  }

  /** Muestra u oculta el mensaje de error de un campo. */
  function setFieldError(field, message) {
    var wrapper = form.querySelector('[data-field="' + field + '"]');
    if (!wrapper) return;
    var errorId = "cf-" + field + "-error";
    var old = document.getElementById(errorId);
    if (old) old.remove();

    var hint = document.getElementById("cf-" + field + "-hint");
    if (hint) hint.hidden = Boolean(message);

    var target = field === "tipo" ? wrapper : document.getElementById("cf-" + field);
    if (field === "tipo") wrapper.classList.toggle("has-error", Boolean(message));
    else target.setAttribute("aria-invalid", String(Boolean(message)));

    if (message) {
      var p = document.createElement("p");
      p.id = errorId;
      p.className = "field-error";
      p.innerHTML = ERROR_ICON;
      p.appendChild(document.createTextNode(message));
      wrapper.appendChild(p);
      target.setAttribute("aria-describedby", errorId);
    } else if (hint) {
      target.setAttribute("aria-describedby", hint.id);
    } else {
      target.removeAttribute("aria-describedby");
    }
  }

  function showErrors(errors) {
    FIELDS.forEach(function (field) { setFieldError(field, errors[field] || ""); });
  }

  function focusFirstError(errors) {
    var first = FIELDS.find(function (f) { return errors[f]; });
    if (!first) return;
    var el = first === "tipo" ? form.querySelector('[name="tipo"]') : document.getElementById("cf-" + first);
    if (el) el.focus();
  }

  function showAlert(message) {
    alertBox.querySelector(".form-alert-text").textContent = message;
    alertBox.hidden = false;
  }

  function setSubmitting(value) {
    submitting = value;
    submitButton.disabled = value;
    submitButton.querySelector(".submit-idle").hidden = value;
    submitButton.querySelector(".submit-busy").hidden = !value;
  }

  // Al corregir un campo, se quita su mensaje de error.
  function clearOnEdit(e) {
    var field = e.target.name;
    if (field && document.getElementById("cf-" + field + "-error")) setFieldError(field, "");
  }
  form.addEventListener("input", clearOnEdit);
  form.addEventListener("change", clearOnEdit);

  // Los botones con data-project-type preseleccionan el tipo de proyecto.
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-project-type]");
    if (!link) return;
    var radio = form.querySelector('[name="tipo"][value="' + link.dataset.projectType + '"]');
    if (radio) {
      radio.checked = true;
      setFieldError("tipo", "");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitting) return;

    var data = readValues();
    var errors = validate(data);
    showErrors(errors);
    if (Object.keys(errors).length) {
      showAlert("Revisa los campos marcados antes de enviar.");
      focusFirstError(errors);
      return;
    }

    alertBox.hidden = true;
    setSubmitting(true);

    // Envío como formulario clásico (application/x-www-form-urlencoded) para que PHP lo lea en $_POST.
    var body = new URLSearchParams({
      nombre: data.nombre,
      empresa: data.empresa,
      email: data.email,
      telefono: data.telefono,
      tipo: data.tipo,
      descripcion: data.descripcion,
      presupuesto: data.presupuesto,
      plazo: data.plazo,
      consentimiento: data.consentimiento ? "1" : "",
      website: form.elements.website.value,
      startedAt: String(startedAt)
    });

    fetch(form.getAttribute("action"), { method: "POST", body: body, headers: { Accept: "application/json" } })
      .then(function (res) {
        return res.json()
          .catch(function () { return {}; })
          .then(function (json) { return { ok: res.ok, json: json }; });
      })
      .then(function (result) {
        // Solo se informa éxito si el servidor confirmó el envío del correo.
        if (result.ok && result.json.success === true) {
          form.reset();
          startedAt = Date.now();
          form.hidden = true;
          success.hidden = false;
          success.focus();
          return;
        }
        if (result.json.errors) {
          showErrors(result.json.errors);
          focusFirstError(result.json.errors);
        }
        showAlert(result.json.message || GENERIC_ERROR);
        requestAnimationFrame(function () { alertBox.focus(); });
      })
      .catch(function () {
        showAlert(GENERIC_ERROR);
        requestAnimationFrame(function () { alertBox.focus(); });
      })
      .then(function () {
        setSubmitting(false);
      });
  });

  document.getElementById("contact-again").addEventListener("click", function () {
    success.hidden = true;
    form.hidden = false;
  });
})();
