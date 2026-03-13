import CardFactory from "./CardFactory.js";

export default class SingletonPortfolio {
    static instance = null;
    constructor() {
        if (SingletonPortfolio.instance) {
            return SingletonPortfolio.instance;
        }
        this.cardFactory = new CardFactory();

        this.projects = [
        {
            title: "App de tutores",
            description:
            "Plataforma para buscar tutores por materia, ver perfiles, disponibilidad y contactar.",
        },
        {
            title: "Portafolio personal",
            description:
            "Diseño centrado en UX, navegación clara, modo oscuro y estructura ordenada.",
        },
        {
            title: "Formulario de contacto",
            description:
            "Formulario con validación básica en JavaScript para mejorar la experiencia del usuario.",
        },
        ];

        PortfolioApp.instance = this;
    }

    


}