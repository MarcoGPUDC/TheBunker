export async function cargarVista(nombreVista) {
    const res = await fetch(`views/${nombreVista}.html`);
    const html = await res.text();
    const root = document.getElementById('spa-root');
    root.innerHTML = html;
  
    gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }
  