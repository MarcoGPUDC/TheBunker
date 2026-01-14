async function cargarHorarios(actividad) {
    var pag;
    if(actividad=="calistenia"){
        pag="0";
    } else if(actividad=="funcional-chicas"){
        pag="1638770279";
    } else if(actividad=="funcional-mayores"){
        pag="431847341";
    } else if(actividad=="jiu-jitzu"){
        pag="676925863";
    } else if(actividad=="danzas-arabes"){
        pag="270624033";
    } else {
        pag="0";
    }
    const url = `https://docs.google.com/spreadsheets/d/1DSYQ1u2NkTMMZv2jrNrYA0p-bz7je1ZBNyOZreC0Tt4/export?gid=${pag}&format=csv`;
    
    const res = await fetch(url);
    const csv = await res.text();
    
    const filas = csv.trim().split('\n').map(f =>
        f.split(',').map(c => c.replaceAll('"','').trim())
    );
    
    const [encabezados, ...datos] = filas;
    
    const thead = document.querySelector(`#${actividad} thead`);
    const tbody = document.querySelector(`#${actividad} tbody`);
    
    thead.innerHTML =
        '<tr>' + encabezados.map(h => `<th>${h}</th>`).join('') + '</tr>';
    
    tbody.innerHTML = datos.map(fila =>
        '<tr>' + fila.map(c => `<td class="text-center">${c}</td>`).join('') + '</tr>'
    ).join('');
    }
      
cargarHorarios("calistenia");
//cargarHorarios("funcional-chicas");
//cargarHorarios("funcional-mayores");
//cargarHorarios("jiu-jitzu");
//cargarHorarios("danzas-arabes");
      