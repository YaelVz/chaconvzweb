document.addEventListener('DOMContentLoaded', function() {
    const inputTarea = document.getElementById('tareas');
    const botonAgregar = document.getElementById('Agregar');
    const listaTareas = document.getElementById('lista');

    botonAgregar.addEventListener('click', function() {
        const tarea = inputTarea.value.trim();
        if (tarea) {
            const listItem = document.createElement('li');
            listItem.textContent = tarea + ' ';

            // Crear botón de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Ok';
            btnEliminar.className = 'btn-eliminar';
            btnEliminar.addEventListener('click', function(e) {
                e.stopPropagation(); // Evita marcar como completada al eliminar
                listaTareas.removeChild(listItem);
            });

            listItem.appendChild(btnEliminar);

            // Marcar como completada al hacer click en el li
            listItem.addEventListener('click', function(e) {
                if (e.target !== btnEliminar) {
                    listItem.classList.toggle('completada');
                }
            });

            listaTareas.appendChild(listItem);
            inputTarea.value = '';
        }
    });
});