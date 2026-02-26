const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

(function initTheme() {
  const saved = localStorage.getItem("theme"); // "dark" | "light" | null
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initial = saved ?? (prefersDark ? "dark" : "light");
  document.documentElement.dataset.theme = initial;

  const btn = $("#themeToggle");
  if (!btn) return;

  const syncBtn = () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.textContent = isDark ? "Modo claro" : "Modo oscuro";
  };

  syncBtn();

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", document.documentElement.dataset.theme);
    syncBtn();
  });
})();
(function initSmoothScroll() {
  const links = $$(".nav__link");
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();


(function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => io.observe(el));
})();


(function initForm() {
  const form = $("#contactForm");
  if (!form) return;

  const hint = $("#formHint");

  const setError = (name, msg) => {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg ?? "";
  };

  const clearErrors = () => {
    setError("name", "");
    setError("email", "");
    setError("message", "");
    if (hint) hint.textContent = "";
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    let ok = true;

    if (name.length < 2) {
      setError("name", "Ingresá un nombre válido (mín. 2 caracteres).");
      ok = false;
    }

    if (!isEmailValid(email)) {
      setError("email", "Ingresá un correo válido.");
      ok = false;
    }

    if (message.length < 10) {
      setError("message", "Escribí un mensaje (mín. 10 caracteres).");
      ok = false;
    }

    if (!ok) {
      if (hint) hint.textContent = "Revisá los campos marcados.";
      return;
    }

    // Simulación de envío (para clase). Acá podrías conectarlo a un backend.
    if (hint) hint.textContent = "¡Mensaje listo! (Simulación de envío)";

    form.reset();
  });
})();