document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Llamado a Ajax e imprimir resultados 
function cargarNombres(e) {
    e.preventDefault();

    // Leer las variables

    // Leer Select
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const numero = document.getElementById('numero').value;

    let url = '';
    url += 'http://uinames.com/api/?';

    // Si hay un origen agregarlo a la URL
    if (origenSeleccionado !== '') {
        url += `region=${origenSeleccionado}&`;
    }

    // Si hay un genero agregarlo a la URL
    if (generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }

    // Si hay cantidad agregarloaa la URL
    if (numero !== '') {
        url += `amount=${numero}&`;
    }

    // Conectar con AJAX
    const xhr = new XMLHttpRequest();

    // Abrimos Conexion
    xhr.open('GET', url, true);

    // Datos e impresion del Template
    xhr.onload = function() {
        if (this.status === 200) {
            const nombres = JSON.parse(this.responseText);

            //Generar HTML
            let htmlNombres = '<div class="card-header">NOMBRES GENERADOS</div>';

            htmlNombres += '<ul class="lista">';

            // Imprimir cada nombre
            nombres.forEach(nombre => {
                htmlNombres += `
                    <li>${nombre.name}
                `;
            });

            htmlNombres += '<ul>';

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }

    // Enviar Request
    xhr.send();
}