export async function cargarVista(nombreVista) {
    const res = await fetch(`views/${nombreVista}.html`);
    const html = await res.text();
    const root = document.getElementById('spa-root');
    root.innerHTML = html;
  
    gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    if (nombreVista === 'home') {
    const video = document.getElementById('videoPresentacion');
    if (window.matchMedia("(max-width: 480px)").matches) {
      video.setAttribute("muted", "");
      video.play();
    }    
    video.addEventListener('click', function() {  
      window.open('https://maps.app.goo.gl/mmXMTgcaCohwSJJM6', '_newblank');
    });
    }


  }
  