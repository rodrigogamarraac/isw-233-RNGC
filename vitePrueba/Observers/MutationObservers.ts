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
        if (container instanceof HTMLElement) {
          container.classList.toggle('is-empty', container.children.length === 0);
        }
      }
    });
  });

  const aboutColor: HTMLElement = document.querySelector('.about--box');
  const buttonHeader = document.querySelector('#themeToggle');
  //Probando mutation
  const mutationAbout = new MutationObserver(entries => {
    //console.log(entries);
    const textNow = buttonHeader.textContent.toLowerCase();
    if (textNow.includes('claro')) {
      aboutColor.style.background = '#1a1f2f';
    }
    else{
      aboutColor.style.background = '#e5e7eb';
    }
  });

  mutationAbout.observe(buttonHeader, {
    characterData: true,
    childList: true,
    subtree: true
  })

  containers.forEach((container) => {
    mo.observe(container, { childList: true });
  });
}

initDynamicCardObservers();