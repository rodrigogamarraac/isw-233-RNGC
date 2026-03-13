/*export default class CardFactory {
  createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const title = document.createElement("h3");
    title.className = "project-card__title";
    title.textContent = project.title;

    const description = document.createElement("p");
    description.className = "project-card__description";
    description.textContent = project.description;

    article.appendChild(title);
    article.appendChild(description);

    return article;
  }
}*/
function ProjectCard(){
  this.type = "project";
}

function BlogCard(){
  this.type = "blog";
}

function CardFactory(){
  this.createCard = (type) => {
    switch(type){
      case "project":
        return new ProjectCard();
      case "blog":
        return new BlogCard();
    }
  }
}

const cardFactory = new CardFactory();
cardFactory.createCard("project");
cardFactory.createCard("project");
cardFactory.createCard("project");
cardFactory.createCard("blog");
cardFactory.createCard("blog");
cardFactory.createCard("blog");
