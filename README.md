# AppWebTarea1 Portafolio

## Introducción
Este proyecto es un **portafolio web responsive** desarrollado con **HTML, CSS y JavaScript puro (vanilla)**. Está pensado para presentar información personal/profesional y practicar buenas prácticas de maquetación, estilos modernos e interactividad básica.

Incluye:
- Encabezado con marca personal y navegación.
- Sección de **Proyectos** (mínimo 3 tarjetas con imagen, título y descripción).
- Vista previa de **Blog** (3 entradas con título, fecha y resumen).
- Sección **Sobre mí**.
- Sección **Contacto** con formulario y validación.
- **Footer** con enlaces a redes sociales.
- **Modo oscuro** con botón (persistencia en `localStorage`).
- Animación “reveal on scroll” (IntersectionObserver).


## Estructura del proyecto

index.html # Estructura HTML + secciones del portafolio
styles.css # Estilos
script.js # Interactividad 
README.md # Documentación del proyecto



## Qué se hace
Se construye una página de portafolio que cumple con los requerimientos de la tarea:
- **HTML** con secciones claras (`header`, `main`, `section`, `footer`).
- **Diseño limpio** con CSS moderno:
  - Variables CSS para colores, sombras y radios.
  - Componentes reutilizables (botones, cards, grids).
- **Interactividad con JavaScript**:
  - Alternar entre modo claro/oscuro.
  - Scroll suave al hacer click en la navegación.
  - Animación de entrada al hacer scroll.
  - Validación básica del formulario (nombre, email, mensaje).


## Cómo se hace

### 1) HTML (`index.html`)
- Se define la estructura del sitio: **hero**, proyectos, blog, sobre mí, contacto y footer.
- La navegación apunta a IDs internos (por ejemplo `#proyectos`, `#blog`, etc.).
- El formulario de contacto usa `novalidate` para manejar validación con JS.

### 2) CSS (`styles.css`)
- Se usan variables CSS 
- El **modo oscuro** se activa

### 3) JavaScript (`script.js`)
- **Tema**:
 


## Por qué se hace
- Para **cumplir la tarea** de crear una página completa (estructura, estilos e interactividad) siguiendo una referencia de diseño.
- Para practicar **front-end básico** sin frameworks (vainilla JS):
  - HTML semántico, CSS responsive y JS para comportamiento.
- Para reforzar consistencia visual (colores, tipografía, espaciados) y accesibilidad básica (por ejemplo, “skip to content”).


## Link al Figma
- **Figma:** https://www.figma.com/proto/RD6z0EXFzczNlMgKfStwLm/Untitled?node-id=4-2&t=weXITSqgLLHPwfA8-1


## Cómo ejecutar
No hay dependencias ni instalación.

1. Abrí `index.html` en el navegador (doble click)


## Autor
- Rodrigo Gamarra
- **Materia:** Aplicaciones Web I