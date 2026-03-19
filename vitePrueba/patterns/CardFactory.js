export default class CardFactory {
  createCard(type, data) {
    switch (type) {
      case 'project':
        return this.createProjectCard(data);
      case 'blog':
        return this.createBlogCard(data);
      default:
        throw new Error(`Tipo de card no soportado: ${type}`);
    }
  }

  createProjectCard(project) {
    const card = document.createElement('project-card');
    card.setAttribute('title', project.title);
    card.setAttribute('text', project.description);
    card.setAttribute('img', project.image);
    card.setAttribute('alt', project.alt);
    return card;
  }

  createBlogCard(post) {
    const card = document.createElement('blog-card');
    card.setAttribute('title', post.title);
    card.setAttribute('text', post.text);
    card.setAttribute('date', post.date);
    card.setAttribute('datetime', post.datetime);
    return card;
  }
}
