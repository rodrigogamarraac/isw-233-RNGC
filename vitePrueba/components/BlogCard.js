import handlebars from 'handlebars/dist/handlebars.js';
import projectCardTemplate from '../templates/blog-card.hbs?raw';
const template = handlebars.compile(projectCardTemplate);
export default class BlogCard extends HTMLElement {
  connectedCallback() {

    const data = {
      title: this.getAttribute('title') ?? 'Entrada del blog',
      text: this.getAttribute('text') ?? '',
      datetime: this.getAttribute('datetime') ?? '',
      date: this.getAttribute('date') ?? ''
    }

    this.innerHTML = template(data);
    /*
    const title = this.getAttribute('title') ?? 'Entrada del blog';
    const text = this.getAttribute('text') ?? '';
    const datetime = this.getAttribute('datetime') ?? '';
    const date = this.getAttribute('date') ?? '';

    this.innerHTML = `
      <article class="blog-row">
        <div class="blog-row__meta">
          <h3 class="blog-row__title">${title}</h3>
          <time class="blog-row__date" datetime="${datetime}">${date}</time>
        </div>
        <p class="blog-row__text">${text}</p>
      </article>
    `;*/
  }
  
}

if (!customElements.get('blog-card')) {
  customElements.define('blog-card', BlogCard);
}
