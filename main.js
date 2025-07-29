import { cargarVista } from './js/router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Carga inicial
  const vistaInicial = history.state?.vista || 'home';
  cargarVista(vistaInicial);

  // Manejo de clicks en nav
  document.querySelectorAll('[data-link]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const vista = e.target.dataset.link;
      history.pushState({ vista }, '', `/${vista}`);
      cargarVista(vista);
    });
  });

  // Botón atrás/adelante
  window.onpopstate = (event) => {
    const vista = event.state?.vista || 'home';
    cargarVista(vista);
  };
});

// main.js
async function cargarCabecera() {
  const res = await fetch('views/header.html');
  const html = await res.text();
  const contenedor = document.createElement('header');
  contenedor.innerHTML = html;
  document.body.insertBefore(contenedor, document.body.firstChild);
}
// Desplegar menu lateral


document.addEventListener('DOMContentLoaded', async () => {
  await cargarCabecera();
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('side-menu')?.classList.toggle('show');
  });
  
  // Listeners después de que se cargó la cabecera
  document.querySelectorAll('[data-link]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const vista = e.target.dataset.link;
      history.pushState({ vista }, '', `/${vista}`);
      document.getElementById('side-menu')?.classList.toggle('show');
      cargarVista(vista);
    });
  });

  // Carga inicial
  const vistaInicial = history.state?.vista || 'home';
  cargarVista(vistaInicial);

  window.onpopstate = (event) => {
    const vista = event.state?.vista || 'home';
    cargarVista(vista);
  };
});
