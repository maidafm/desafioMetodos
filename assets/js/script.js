let tareas = [
    { id: 1, descripcion: 'Tarea 1', completada: false }
];

function actualizarTareas() {
    const total = document.getElementById('total');
    const completas = document.getElementById('completadas');

    total.textContent = tareas.length;
    completas.textContent = tareas.filter(tarea => tarea.completada).length;
}

function leerTareas() {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Vacía el contenido actual del <ul>

    tareas.forEach(tarea => {
        const item = document.createElement('li');
        item.classList.add('lista');
        item.innerHTML = `
            <div class="tarea-item">
                <span class="tarea-id">${tarea.id}</span>
                <span class="tarea-descripcion ${tarea.completada ? 'completada' : ''}">${tarea.descripcion}</span>
                <div>
                    <input type="checkbox" ${tarea.completada ? 'checked' : ''} onchange="marcarTarea(${tarea.id}, this.checked)">
                    <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})">X</button>
                </div>
            </div>
        `;
        lista.appendChild(item); // Agrega cada tarea como un nuevo elemento <li> al final de <ul>
    });

    actualizarTareas();
}


function agregarTarea(descripcion) {
    const nueva = {
        id: tareas.length + 1,
        descripcion: descripcion,
        completada: false
    };
    tareas.push(nueva);
    leerTareas(); // Vuelve a generar la lista de tareas después de agregar una nueva
}

function marcarTarea(id, isChecked) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = isChecked;
        actualizarTareas();
        leerTareas(); // Vuelve a generar la lista de tareas después de marcar una como completada
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    leerTareas(); // Vuelve a generar la lista de tareas después de eliminar una
}

document.getElementById('agregar').addEventListener('click', function() {
    const nuevaTareaInput = document.getElementById('nuevaTarea');
    const nuevaTareaTexto = nuevaTareaInput.value.trim();
    if (nuevaTareaTexto === '') {
        return;
    }
    agregarTarea(nuevaTareaTexto);
    nuevaTareaInput.value = '';
});

leerTareas();
