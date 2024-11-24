const formEntrega = document.querySelector('.entrega form');
const formDevolucion = document.querySelector('.devolucion form');
const tablaLibros1 = document.querySelector('#disponibilidad table');
const tablaMiembros1 = document.querySelector('#registro table');



    biblioteca.miembros.forEach(miembro => {
        let librosPrestados = miembro.mostrarLibrosPrestados();
        let nuevaFila = tablaMiembros1.insertRow();
        nuevaFila.innerHTML = `
            <td>${miembro.id}</td>
            <td>${miembro.nombre}</td>
            <td>${miembro.dni}</td>
            <td>${miembro.telefono}</td>
            <td>${miembro.correo}</td>
            <td>${librosPrestados}</td>
        `;
    });


  
biblioteca.libros.forEach(libro => {
    let nuevaFila = tablaLibros1.insertRow();
    nuevaFila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.genero}</td>
        <td>${libro.año}</td>
        <td>${libro.disponible ? 'Disponible' : 'No disponible'}</td>
    `;
});
// Event listener para la entrega de libros
formEntrega.addEventListener('submit', function (e) {
    e.preventDefault();

    let nombreMiembro = document.getElementById('miembro-prestado').value;
    let tituloLibro = document.getElementById('titulo-prestado').value;

    // Buscar al miembro en la lista de miembros
    let miembroEncontrado = biblioteca.miembros.find(miembro => miembro.nombre === nombreMiembro);
    let libroEncontrado = biblioteca.libros.find(libro => libro.titulo === tituloLibro && libro.disponible);
    
    if (!miembroEncontrado) {
        alert("Miembro no encontrado");
        return;
    }

    if (!libroEncontrado) {
        alert("Libro no disponible o no encontrado");
        return;
    }

    // Prestar el libro
    miembroEncontrado.tomarPrestado(libroEncontrado);
    actualizarTablaLibros();
    actualizarTablaMiembros();

    alert(`El libro "${libroEncontrado.titulo}" ha sido prestado a ${miembroEncontrado.nombre}.`);
    formEntrega.reset();
});

// Event listener para la devolución de libros
formDevolucion.addEventListener('submit', function (e) {
    e.preventDefault();

    let nombreMiembro = document.getElementById('miembro-devuelto').value;
    let tituloLibro = document.getElementById('titulo-devuelto').value;

    // Buscar al miembro en la lista de miembros
    let miembroEncontrado = biblioteca.miembros.find(miembro => miembro.nombre === nombreMiembro);
    let libroEncontrado = biblioteca.libros.find(libro => libro.titulo === tituloLibro && !libro.disponible);
    
    if (!miembroEncontrado) {
        alert("Miembro no encontrado");
        return;
    }

    if (!libroEncontrado) {
        alert("Libro no encontrado o ya está disponible");
        return;
    }

    // Devolver el libro
    miembroEncontrado.devolverLibro(libroEncontrado);
    actualizarTablaLibros();
    actualizarTablaMiembros();

    alert(`El libro "${libroEncontrado.titulo}" ha sido devuelto por ${miembroEncontrado.nombre}.`);
    formDevolucion.reset();
});

// Función para actualizar la tabla de libros
function actualizarTablaLibros() {
    tablaLibros1.innerHTML = `
    
    <caption class="titulo-lista">LIBROS DISPONIBLES</caption>
        <tr>
            <th>Título del libro</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Año</th>
            <th>Disponibilidad</th>h
        </tr>`;

    biblioteca.libros.forEach(libro => {
        let nuevaFila = tablaLibros1.insertRow();
        nuevaFila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.genero}</td>
            <td>${libro.año}</td>
            <td>${libro.disponible ? 'Disponible' : 'No disponible'}</td>
        `;
    });
}

// Función para actualizar la tabla de miembros
function actualizarTablaMiembros() {
    tablaMiembros1.innerHTML = `
    <caption class="titulo-lista">MIEMBRO REGISTRADOS</caption>    
    <tr>
            <th>ID</th>
            <th>Nombre de miembro</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Libros prestados</th>
        </tr>`;
    
    biblioteca.miembros.forEach(miembro => {
        let librosPrestados = miembro.mostrarLibrosPrestados();
        let nuevaFila = tablaMiembros1.insertRow();
        nuevaFila.innerHTML = `
            <td>${miembro.id}</td>
            <td>${miembro.nombre}</td>
            <td>${miembro.dni}</td>
            <td>${miembro.telefono}</td>
            <td>${miembro.correo}</td>
            <td>${librosPrestados}</td>
        `;
    });
}