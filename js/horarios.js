async function cargarHorarios() {
    const url = 'https://docs.google.com/spreadsheets/d/1DSYQ1u2NkTMMZv2jrNrYA0p-bz7je1ZBNyOZreC0Tt4/export?format=csv';
    
    const res = await fetch(url);
    const csv = await res.text();
    
    const filas = csv.trim().split('\n').map(f =>
        f.split(',').map(c => c.replaceAll('"','').trim())
    );
    
    const [encabezados, ...datos] = filas;
    
    const thead = document.querySelector('#tabla-horarios thead');
    const tbody = document.querySelector('#tabla-horarios tbody');
    
    thead.innerHTML =
        '<tr>' + encabezados.map(h => `<th>${h}</th>`).join('') + '</tr>';
    
    tbody.innerHTML = datos.map(fila =>
        '<tr>' + fila.map(c => `<td class="text-center">${c}</td>`).join('') + '</tr>'
    ).join('');
    }
      
cargarHorarios();
      