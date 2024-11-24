class Libro {
    constructor(titulo, autor, genero, año, disponible) {           // creamos la clase "Libro", la cual nos permitirá crear objetos que tendran las siguientes propiedades :  
        this.titulo = titulo                                        //titulo: titulo del libro, 
        this.autor = autor                                          //autor: nombre del autor
        this.genero = genero                                        // genero: genero literario del libro
        this.año = año                                              //año: año del libro
        this.disponible = disponible                                // disponible: Booleano que indica si el libro está disponible para prestar
    }                                                               // Para ello utilizamos un constructor, el cual recibe como paramentros:  titulo, autor, genero, año, disponibilidad del libro.
 
    prestar() {                             //  Método para prestar el libro.
        if (this.disponible === true) { //verifica si está disponible 
            alert("esta disponible");
            this.disponible = false   // lo marca como no disponible si se presta pasando su valor a "false"
            return true             //se devuelve un "true", esto nos sirve para operar fuera. Indica que se presto exitosamente.
        }
        else {
            alert("no esta disponible"); //En caso de que no este disponible, muestra este mensaje.
        }
    }
    devolver() {                        //Metodo para devolver el libro, funciona de manera similar al metodo "prestar"
        if (this.disponible === false) {    //verifica si no está disponible, ya que no tendria sentido que se devuelva un libro que si se encuentre en disposición.  
            alert("libro devuelto de manera correcta");
            this.disponible = true          // Marca el libro como disponible nuevamente cambiando su valor a "true".
        }
        else {
            alert("libro disponible pibe"); // Si ya se encuentra disponible, muestra este mensaje.
        }
    }
}
class Miembro {                  // creamos la clase "Miembro", la cual nos permitirá crear objetos que tendran las siguientes propiedades :
    constructor(nombre, dni, correo, telefono, id) {
        this.librosPrestados = []  //librosPrestados: aqui se inicializa un array vacio para poder guardar los libros que le son prestados al miembro en cuestión.
        this.id = id;               //id: es la id del miembro 
        this.nombre = nombre;       //nombre: nombre del miembro 
        this.dni= dni;
        this.telefono= telefono;
        this.correo= correo;
    }                              // Para ello utilizamos un constructor, el cual recibe como paramentros: nombre y la id del miembro.

    tomarPrestado(libro) {           //  Método para tomar prestado un libro por un miembro. Aqui se pide como paramentro que se le pase un libro.
        if (libro.prestar() === true) { //Se evalua si el libro está disponible para ser prestado 
            this.librosPrestados.push(libro) //En caso de que si este disponible, se añade el libro al array de los librosPrestados con el metodo push.  
        }
    }
    devolverLibro(libro) { //  Método para devolver un libro por un miembro. Aqui se pide como paramentro que se le pase un libro.
        libro.devolver(); //llama el metodo devolver() del libro para cambiar la propiedad de disponible a true
        let posicionLibro = this.librosPrestados.indexOf(libro); //Aqui lo que hace es asignarle a una variable llamada posicionLibro el resultado de la busqueda de la posicion en la que se encuetra el libro que se quiere devolver, dentro del array librosPrestados. esto lo hace con el metodo indexOf.
        this.librosPrestados.splice(posicionLibro, 1); // Aqui lo que se hace es eliminar el elemento del array que se encuentra en la posicion que le pasamos como parametro. Es decir, eliminamos el libro que se quiere devolver de el array librosPrestados. Lo hacemos con el metodo splice.
    }
    mostrarLibrosPrestados() { //Metodo para mostrar los libros que tiene en su poder el miembro en cuestion.
        let LibrosEnPosicion = []; // Este es un array vacio que nos servirá para guardar solamente los titulos de los libros
    if (this.librosPrestados.length === 0) {
        return "Ningún libro prestado"; // Devuelve un mensaje si no hay libros prestados
    } else {
        for (let consultaLibros of this.librosPrestados) {
            if (consultaLibros.disponible === false) {
                LibrosEnPosicion.push(consultaLibros.titulo);
            }
        }
        return LibrosEnPosicion.join("<br>"); // Devuelve los títulos separados por comas
    }
    }
}
class Biblioteca {        // creamos la clase "Biblioteca", la cual nos permitirá crear objetos que tendran las siguientes propiedades :
    constructor(nombre) {
        this.nombre = nombre //nombre: es el nombre de la biblioteca.
        this.libros = []  // libros: aqui se inicializa un array vacio en donde vamos a guardar los libros de la biblioteca
        this.miembros = [] // miembros: aqui se inicializa un array vacio en donde vamos a guardar los miembros de la biblioteca
    }                       // // Para ello utilizamos un constructor, el cual recibe como paramentros: nombre.
   
    agregarLibro(libro) { //Metodo para agregar libros a la biblioteca, se pide como parametro un libro

        this.libros.push(libro) // Aqui con el metodo push, añadimos el libro en cuestion al array libros

    }
    registrarMiembro(miembro) {     //Metodo para registrar un nuevo miembro a la biblioteca, se pide como parametro un miembro

        this.miembros.push(miembro) // Aqui con el metodo push, añadimos el miembro en cuestion al array miembros.
    }
    mostrarLibrosDisponibles() {  // Método para mostrar los libros disponibles en la biblioteca
        let librosDisponibles=[]; // Este es un array vacio que nos servirá para guardar solamente los titulos de los libros que esten disponibles para ser prestados.
        for (let consultaLibros of this.libros) { //Este for nos sirve para recorrer el array libros de la biblioteca 
            if (consultaLibros.disponible === true) { //En el caso de que la propiedad "disponible" del libro este con el valor "true" 
              librosDisponibles.push(consultaLibros.titulo); //Añade el titulo del libro en el array librosDisponibles, con el metodo push
            }
        }
        if(librosDisponibles.length === 0) //Si la longitud de array librosDisponibles es igual a 0(cero)
        {
            alert("No hay libros disponibles en este momento."); //muestra este mensaje.
        }
        else{ //si no es 0 (cero)
            alert(`Los libros disponibles son:\n ${librosDisponibles.join("\n")}`); //Se muestran los titulos de los libros disponibles separandolos por un salto de linea, se utiliza el metodo join.
        }
    }
}

let biblioteca = new Biblioteca("Alejandria"); //se crea el objeto "biblioteca" llamada "Pepe" con la clase Biblioteca.
let libro2 = new Libro("Habitos Atomicos", "Hernan", "autoayuda", 2000, true) //se crea un objeto "libro2" con la clase Libro.
let libro3 = new Libro("La Divina Comedia", "tobias", "drama", 1, true) //se crea un objeto "libro3" con la clase Libro.
let libro4 = new Libro("Principito", "Antoine de Saint-Exupéry", " Literatura infantil", 1943, true) //se crea un objeto "libro4" con la clase Libro.
let miembro2 = new Miembro("tomas", 1434, "este@self.com", 323232, 1 ); //se crea un objeto "miembro2" con la clase Miembro.
let miembro3 = new Miembro("Agustin", 32432, "este@self.com", 23213, 2); //se crea un objeto "miembro3" con la clase Miembro.
variable = 0;
biblioteca.agregarLibro(libro2); // Añade el libro2 a la biblioteca
biblioteca.agregarLibro(libro3); // Añade el libro3 a la biblioteca
biblioteca.agregarLibro(libro4); // Añade el libro4 a la biblioteca
biblioteca.registrarMiembro(miembro2);// Se registra el miembro2 a la biblioteca
biblioteca.registrarMiembro(miembro3);// Se registra el miembro3 a la biblioteca


const formMiembros = document.querySelector('#registro-miembro form');
const formLibros = document.querySelector('#registro-libro form');
const tablaMiembros = document.querySelector('#registro table');
const tablaLibros = document.querySelector('#disponibilidad table');
formMiembros.addEventListener('submit', function (e) {
    e.preventDefault(); 
    let nombre = document.getElementById('nombre').value;
    let dni = document.getElementById('dni').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    var suma=2;
    let nuevoMiembro = new Miembro(nombre, dni, correo, telefono );
        suma=suma + 1;
        nuevoMiembro.id= suma;
    biblioteca.registrarMiembro(nuevoMiembro);

    let nuevaFila = tablaMiembros.insertRow();
    nuevaFila.innerHTML = `
        <td>${biblioteca.miembros.length}</td>
        <td>${nombre}</td>
        <td>${dni}</td>
        <td> ${telefono} </td>
        <td>${correo}</td>
        <td>Ningún libro prestado</td>
    `;
    
    alert("Miembro registrado exitosamente.");
    formMiembros.reset();  
});

// Event listener para agregar un libro
formLibros.addEventListener('submit', function (e) {
    e.preventDefault();  
    let titulo = document.querySelector('#titulo').value;
    let autor = document.querySelector('#autor').value;
    let genero = document.querySelector('#genero').value;
    let año = document.querySelector('#año').value;
    
    let nuevoLibro = new Libro(titulo, autor, genero, año, true);
    biblioteca.agregarLibro(nuevoLibro);

    let nuevaFila = tablaLibros.insertRow();
    nuevaFila.innerHTML = `
        <td>${nuevoLibro.titulo}</td>
        <td>${nuevoLibro.autor}</td>
        <td>${nuevoLibro.genero}</td>
        <td>${nuevoLibro.año}</td>
        <td>Disponible</td>
    `;
    
    alert("Libro registrado exitosamente.");
    formLibros.reset();
});
