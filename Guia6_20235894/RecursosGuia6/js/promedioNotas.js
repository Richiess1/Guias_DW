const containerEstudiante = document.querySelector("#idContainerEstudiantes");
const btnPromedio = document.querySelector("#idBtnPromedio");

btnPromedio.addEventListener("click", generarEstudiante);

function generarEstudiante() {
    let arrayEstudiante = [];

    let totalEstudiantes = parseInt(document.querySelector("#inputNumeroEstudiante").value);
    let contador = 1;

    
    if (isNaN(totalEstudiantes) || totalEstudiantes <= 0) {
        alert("Por favor, ingresa un número válido de estudiantes.");
        return;
    }

    
    while (contador <= totalEstudiantes) {
        const estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
        let calificacion;

        do {
            calificacion = parseFloat(prompt(`Ingrese la calificación del estudiante ${contador}`));
        } while (isNaN(calificacion) || calificacion < 0 || calificacion > 10);

        
        arrayEstudiante.push([estudiante, calificacion.toFixed(2)]);
        contador++;
    }

    
    let calificacionAlta = -1;
    let sumaCalificaciones = 0;
    let posicionMejorEstudiante = 0;

    let listado = "<h3>Listado de estudiantes registrados</h3><ol>";
    
    for (let i = 0; i < arrayEstudiante.length; i++) {
        const [nombre, nota] = arrayEstudiante[i];
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;
        sumaCalificaciones += parseFloat(nota);

        if (parseFloat(nota) > calificacionAlta) {
            calificacionAlta = parseFloat(nota);
            posicionMejorEstudiante = i;
        }
    }
    
    listado += "</ol>";
    const promedio = (sumaCalificaciones / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con la mejor calificación:</b> ${arrayEstudiante[posicionMejorEstudiante][0]}</p>`;

    containerEstudiante.innerHTML = listado;
}
