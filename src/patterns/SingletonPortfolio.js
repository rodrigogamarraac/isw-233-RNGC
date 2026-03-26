import CardFactory from './CardFactory.js';

export default class SingletonPortfolio {
  static instance = null;

  constructor() {
    if (SingletonPortfolio.instance) {
      return SingletonPortfolio.instance;
    }

    this.cardFactory = new CardFactory();

    this.projects = [
      {
        title: 'App de tutores',
        description:
          'Plataforma para buscar tutores por materia, ver perfiles, disponibilidad y contactar.',
        image:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520'%3E%3Crect width='900' height='520' rx='22' fill='%23ff4fa3'/%3E%3C/svg%3E",
        alt: 'Vista previa del proyecto 1',
      },
      {
        title: 'Portafolio personal',
        description:
          'Diseño centrado en UX: filtros, tarjetas de proyectos y navegación clara tipo portafolio.',
        image:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520'%3E%3Crect width='900' height='520' rx='22' fill='%23ff4fa3'/%3E%3C/svg%3E",
        alt: 'Vista previa del proyecto 2',
      },
      {
        title: 'Formulario de contacto',
        description:
          'Front-end responsive con modo oscuro, transiciones y formulario con validación básica.',
        image:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520'%3E%3Crect width='900' height='520' rx='22' fill='%23ff4fa3'/%3E%3C/svg%3E",
        alt: 'Vista previa del proyecto 3',
      },
    ];

    this.blogPosts = [
      {
        title: 'Cómo estructuré mi portafolio',
        date: '12 Feb 2026',
        datetime: '2026-02-12',
        text: 'Tips rápidos para un hero claro, secciones simples y consistencia visual.',
      },
      {
        title: 'Buenas prácticas en CSS',
        date: '05 Feb 2026',
        datetime: '2026-02-05',
        text: 'Variables, espaciado consistente, componentes reutilizables y media queries.',
      },
      {
        title: 'Vanilla JS para interacciones',
        date: '28 Ene 2026',
        datetime: '2026-01-28',
        text: 'Scroll suave, modo oscuro con localStorage y validación del formulario.',
      },
    ];

    SingletonPortfolio.instance = this;
  }

  renderProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    this.projects.forEach((project) => {
      const card = this.cardFactory.createCard('project', project);
      container.appendChild(card);
    });
  }

  renderBlog(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    this.blogPosts.forEach((post) => {
      const card = this.cardFactory.createCard('blog', post);
      container.appendChild(card);
    });
  }
}
