export default class ProjectCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') ?? 'Proyecto';
    const text = this.getAttribute('text') ?? '';
    const img = this.getAttribute('img') ?? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='520'%3E%3Crect width='900' height='520' rx='22' fill='%23ff4fa3'/%3E%3C/svg%3E";
    const alt = this.getAttribute('alt') ?? `Vista previa de ${title}`;

    this.innerHTML = `
      <article class="card project-card">
        <img class="project-card__img" alt="${alt}" src="${img}" />
        <h3 class="card__title">${title}</h3>
        <p class="card__text">${text}</p>
      </article>
    `;
  }
}

if (!customElements.get('project-card')) {
  customElements.define('project-card', ProjectCard);
}
