import './components/ProjectCard.js';
import './components/BlogCard.js';
import SingletonPortfolio from './patterns/SingletonPortfolio.js';
import './index.css';

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

const portfolio = new SingletonPortfolio();
portfolio.renderProjects('projectsContainer');
portfolio.renderBlog('blogContainer');

initDynamicCardObservers();

function initDynamicCardObservers() {
  const projectsContainer = document.getElementById('projectsContainer');
  const blogContainer = document.getElementById('blogContainer');

  const containers = [projectsContainer, blogContainer].filter(Boolean);
  if (containers.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  const registerCard = (node) => {
    if (!(node instanceof HTMLElement)) return;
    if (!node.matches('project-card, blog-card')) return;

    node.classList.add('reveal');
    revealObserver.observe(node);
  };

  // registrar cards ya existentes
  containers.forEach((container) => {
    container.querySelectorAll('project-card, blog-card').forEach(registerCard);
  });

  const mo = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(registerCard);

      if (mutation.type === 'childList') {
        const container = mutation.target;
        container.classList.toggle('is-empty', container.children.length === 0);
      }
    });
  });

  containers.forEach((container) => {
    mo.observe(container, { childList: true });
  });
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initial = saved ?? (prefersDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = initial;

  const btn = $('#themeToggle');
  if (!btn) return;

  const syncBtn = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  };

  syncBtn();

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', document.documentElement.dataset.theme);
    syncBtn();
  });
})();

(function initSmoothScroll() {
  const links = $$('.nav__link');
  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

(function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => io.observe(el));
})();

(function initForm() {
  const form = $('#contactForm');
  if (!form) return;

  const hint = $('#formHint');

  const setError = (name, msg) => {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg ?? '';
  };

  const clearErrors = () => {
    setError('name', '');
    setError('email', '');
    setError('message', '');
    if (hint) hint.textContent = '';
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();

    let ok = true;

    if (name.length < 2) {
      setError('name', 'Ingresá un nombre válido (mín. 2 caracteres).');
      ok = false;
    }

    if (!isEmailValid(email)) {
      setError('email', 'Ingresá un correo válido.');
      ok = false;
    }

    if (message.length < 10) {
      setError('message', 'Escribí un mensaje (mín. 10 caracteres).');
      ok = false;
    }

    if (!ok) {
      if (hint) hint.textContent = 'Revisá los campos marcados.';
      return;
    }

    if (hint) hint.textContent = '¡Mensaje listo! (Simulación de envío)';
    form.reset();
  });
})();
