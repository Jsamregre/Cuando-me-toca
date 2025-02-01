// Mostrar secciones
function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => seccion.style.display = 'none');
    document.getElementById(seccionId).style.display = 'block';
}

// Volver al inicio
function volverInicio() {
    mostrarSeccion('inicio');
}

// Login de administrador
document.getElementById('formLogin').addEventListener('submit', function (event) {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (usuario === 'iglesia' && contrasena === 'Aposento Alto') {
        mostrarSeccion('admin');
        mostrarVistaPrevia();
    } else {
        document.getElementById('errorLogin').style.display = 'block';
    }
});

// Cerrar sesión
function cerrarSesion() {
    document.getElementById('formLogin').reset();
    mostrarSeccion('inicio');
}

// Guardar servicios en localStorage
document.getElementById('formularioServicio').addEventListener('submit', function (event) {
    event.preventDefault();
    const servicio = {
        id: Date.now(),
        departamento: document.getElementById('departamento').value,
        fecha: document.getElementById('fecha').value,
        ministroDirige: document.getElementById('ministroDirige').value,
        ministroPredica: document.getElementById('ministroPredica').value
    };

    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.push(servicio);
    localStorage.setItem('servicios', JSON.stringify(servicios));

    alert('Servicio guardado correctamente.');
    this.reset();
    mostrarVistaPrevia();
});

// Guardar eventos en localStorage
document.getElementById('formularioEvento').addEventListener('submit', function (event) {
    event.preventDefault();
    const evento = {
        id: Date.now(),
        fecha: document.getElementById('fechaEvento').value,
        descripcion: document.getElementById('descripcionEvento').value
    };

    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventos));

    alert('Evento guardado correctamente.');
    this.reset();
    mostrarVistaPrevia();
});

// Mostrar vista previa con opciones de actualizar y borrar
function mostrarVistaPrevia() {
    const vistaPrevia = document.getElementById('vistaPrevia');
    vistaPrevia.innerHTML = '';

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    servicios.forEach(servicio => {
        vistaPrevia.innerHTML += `
            <div id="servicio-${servicio.id}">
                <p><strong>Servicio:</strong> ${servicio.departamento} - ${servicio.fecha} 
                (Dirige: ${servicio.ministroDirige}, Predica: ${servicio.ministroPredica})</p>
                <button onclick="actualizarServicio(${servicio.id})">Actualizar</button>
                <button onclick="borrarServicio(${servicio.id})">Borrar</button>
            </div>
        `;
    });

    eventos.forEach(evento => {
        vistaPrevia.innerHTML += `
            <div id="evento-${evento.id}">
                <p><strong>Evento:</strong> ${evento.fecha} - ${evento.descripcion}</p>
                <button onclick="actualizarEvento(${evento.id})">Actualizar</button>
                <button onclick="borrarEvento(${evento.id})">Borrar</button>
            </div>
        `;
    });
}

// Función para borrar un servicio
function borrarServicio(id) {
    let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios = servicios.filter(servicio => servicio.id !== id);
    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarVistaPrevia();
}

// Función para borrar un evento
function borrarEvento(id) {
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos = eventos.filter(evento => evento.id !== id);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    mostrarVistaPrevia();
}

// Función para actualizar un servicio
function actualizarServicio(id) {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const servicio = servicios.find(servicio => servicio.id === id);

    const nuevoDepartamento = prompt('Nuevo Departamento:', servicio.departamento);
    const nuevaFecha = prompt('Nueva Fecha:', servicio.fecha);
    const nuevoMinistroDirige = prompt('Nuevo Ministro que Dirige:', servicio.ministroDirige);
    const nuevoMinistroPredica = prompt('Nuevo Ministro que Predica:', servicio.ministroPredica);

    if (nuevoDepartamento && nuevaFecha && nuevoMinistroDirige && nuevoMinistroPredica) {
        servicio.departamento = nuevoDepartamento;
        servicio.fecha = nuevaFecha;
        servicio.ministroDirige = nuevoMinistroDirige;
        servicio.ministroPredica = nuevoMinistroPredica;

        localStorage.setItem('servicios', JSON.stringify(servicios));
        mostrarVistaPrevia();
    }
}

// Función para actualizar un evento
function actualizarEvento(id) {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const evento = eventos.find(evento => evento.id === id);

    const nuevaFecha = prompt('Nueva Fecha:', evento.fecha);
    const nuevaDescripcion = prompt('Nueva Descripción:', evento.descripcion);

    if (nuevaFecha && nuevaDescripcion) {
        evento.fecha = nuevaFecha;
        evento.descripcion = nuevaDescripcion;

        localStorage.setItem('eventos', JSON.stringify(eventos));
        mostrarVistaPrevia();
    }
}

// Buscar servicios y eventos por fecha
function buscarPorFecha() {
    const fechaBusqueda = document.getElementById('fechaBusqueda').value;
    const resultadosBusqueda = document.getElementById('resultadosBusqueda');
    resultadosBusqueda.innerHTML = '';

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    const resultadosServicios = servicios.filter(servicio => servicio.fecha === fechaBusqueda);
    const resultadosEventos = eventos.filter(evento => evento.fecha === fechaBusqueda);

    if (resultadosServicios.length === 0 && resultadosEventos.length === 0) {
        resultadosBusqueda.innerHTML = '<p>No se encontraron servicios ni eventos para esta fecha.</p>';
    } else {
        resultadosServicios.forEach(servicio => {
            resultadosBusqueda.innerHTML += `
                <p><strong>Servicio:</strong> ${servicio.departamento} 
                (Dirige: ${servicio.ministroDirige}, Predica: ${servicio.ministroPredica})</p>
            `;
        });

        resultadosEventos.forEach(evento => {
            resultadosBusqueda.innerHTML += `
                <p><strong>Evento:</strong> ${evento.descripcion}</p>
            `;
        });
    }
}

