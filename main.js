import { cargarVista } from './js/router.js';
import {cargarHorarios} from './js/horarios.js';
// main.js
async function cargarCabecera() {
  const res = await fetch('views/header.html');
  const html = await res.text();
  const contenedor = document.createElement('header');
  contenedor.innerHTML = html;
  document.body.insertBefore(contenedor, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Cargar cabecera
  await cargarCabecera();
  

  // 2. Toggle menú lateral
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('side-menu')?.classList.toggle('show');
  });

  // 3. Manejo SPA (delegación de eventos para los clicks)
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;

    e.preventDefault();
    const vista = link.dataset.link;

    history.pushState({ vista }, '', `/${vista}`);
    document.getElementById('side-menu')?.classList.remove('show');
    cargarVista(vista);
    if (vista === 'contacto') {
      cargarHorarios("calistenia");
      //cargarHorarios("funcional-chicas");
      //cargarHorarios("funcional-mayores");
      cargarHorarios("jiu-jitzu");
      //cargarHorarios("danzas-arabes");
    }
  });

  // 4. Detectar vista inicial según la URL
  let vistaInicial = location.pathname.replace('/', '') || 'home';
  cargarVista(vistaInicial);

  // 5. Atrás/adelante del navegador
  window.onpopstate = (event) => {
    const vista = event.state?.vista || location.pathname.replace('/', '') || 'home';
    cargarVista(vista);
  };
  
});

