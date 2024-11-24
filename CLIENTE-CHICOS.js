

const apiUrl2 = 'http://localhost:3000/libros';
const apiUrl1 = 'http://localhost:3000/miembro';
 //MIEMBROS
  // Función para cargar todos los registros
  async function cargar_miembro() 
  {
     try {
        const response = await fetch('http://localhost:3000/miembro');
        const items_miembro = await response.json();
        const miembro_tabla = document.getElementById('itemTable');
        miembro_tabla.innerHTML = ''; // Limpia la tabla
  
        items_miembro.forEach(item_miembro => 
        {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item_miembro.Id_Miembro}</td>
            <td>${item_miembro.Nombre_Apellido}</td>
            <td>${item_miembro.DNI}</td>
            <td>${item_miembro.Numero_Telefono}</td>
            <td>${item_miembro.Email}</td>
            <td>
              <button onclick="editar(${item_miembro.Id_Miembro})">Editar</button>
              <button onclick="eliminarMiembro(${item_miembro.Id_Miembro})">Eliminar</button>
              <button onclick="location.href='miembros-prestados.html?id=${item_miembro.Id_Miembro}&nombre=${item_miembro.Nombre_Apellido}'">Libros Prestados</button>
            </td>
          `;
          miembro_tabla.appendChild(row);
        });
     }
     catch (error) {
        console.error(error);
        alert('Error al cargar los datos');
    }
  }

  //LIBROS
  async function cargar_libro() 
  {
     try{
        const response = await fetch('http://localhost:3000/libros');
        const items_libro = await response.json();
        
        const lirbo_tabla = document.getElementById('libroTable2');
        lirbo_tabla.innerHTML = ''; // Limpia la tabla
  
        items_libro.forEach(items_libro => 
        {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${items_libro.idLibros}</td>
            <td>${items_libro.Titulo_Libro}</td>
            <td>${items_libro.Autor}</td>
            <td>${items_libro.Editorial}</td>
            <td>${items_libro.Genero}</td>
        
            <td>
              <button onclick="editarLibro(${items_libro.idLibros})">Editar</button>
              <button onclick="eliminarLibro(${items_libro.idLibros})">Eliminar</button>
            </td>
          `;
          lirbo_tabla.appendChild(row);
        });
     }
     catch (error) {
        console.error(error);
        alert('Error al cargar los datos');
    }

  }

  //crear-guaradar: libro
  // Función para crear o actualizar un registro
  async function guardarLibro(event) {
    event.preventDefault();
    const id_libro =  document.getElementById('id_libroEditar') ? document.getElementById('id_libroEditar').value : null;
    const titulo = id_libro ? document.getElementById('tituloEditar').value : document.getElementById('titulo').value;
    const autor = id_libro ? document.getElementById('autorEditar').value: document.getElementById('autor').value;
    const editorial = id_libro ? document.getElementById('EditorialEditar').value : document.getElementById('Editorial').value;
    const genero = id_libro ? document.getElementById('generoEditar').value : document.getElementById('genero').value;
    //lo pone como dato
    const data1 = {titulo,autor,editorial,genero};

    const options = {
      method: id_libro ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data1)
    };

    const url1 = id_libro ?  `${apiUrl2}/${id_libro}` : `${apiUrl2}`;
    const response1 = await fetch(url1, options);
    const respuesta2 = await response1.json();
    if (response1.ok) {
      alert(id_libro ? 'Registro actualizado' : 'Registro creado');
      document.getElementById('itemForm1').reset();
      document.getElementById('id_libro').value = "";
      loadItems();
    } else {
      alert('Error al guardar el registro');
      console.error(response1);
      alert(respuesta2.error);
    }
  }

  
  async function editarLibro(id) {
    const response = await fetch(`${apiUrl2}/${id}/editar`);
    const itemeditar = await response.json();
    document.getElementById('id_libroEditar').value = itemeditar.idLibros;
    document.getElementById('tituloEditar').value = itemeditar.Titulo_Libro;
    document.getElementById('autorEditar').value = itemeditar.Autor;
    document.getElementById('EditorialEditar').value = itemeditar.Editorial;
    document.getElementById('generoEditar').value = itemeditar.Genero;
   }
//crear-guardar: miembro

  async function guardarMiembro(event) {
    event.preventDefault();
    const itemId =  document.getElementById('itemIdEditar') ? document.getElementById('itemIdEditar').value : null ;
    const nombre = itemId ?  document.getElementById('nombreEditar').value : document.getElementById('nombre').value;
    const dni = itemId ? document.getElementById('dniEditar').value : document.getElementById('dni').value;
    const email = itemId ? document.getElementById('correoEditar').value : document.getElementById('correo').value;
    const telefono = itemId ? document.getElementById('telefonoEditar').value : document.getElementById('telefono').value;
    
    const data = { itemId, nombre, dni, email, telefono};

    const options = {
      method: itemId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
//`${apiUrl1}/${itemId}`
    const url2 = itemId ? `${apiUrl1}/${itemId}`  : `${apiUrl1}`;
    const response = await fetch(url2, options);
    const respuesta = await response.json();
    if (response.ok) {
      alert(itemId ? 'Registro actualizado' : 'Registro creado');
      document.getElementById('itemForm').reset();
      document.getElementById('itemId').value = "";
    } else {
      alert('Error al guardar el registro');
      alert(respuesta.error);
    }
  }


  // Función para editar un registro
  async function editar(id) {
    const response = await fetch(`${apiUrl1}/obterID/${id}`);
    const itemeditar = await response.json();
    document.getElementById('itemIdEditar').value = itemeditar.Id_Miembro;
    document.getElementById('nombreEditar').value = itemeditar.Nombre_Apellido;
    document.getElementById('dniEditar').value = itemeditar.DNI;
    document.getElementById('correoEditar').value = itemeditar.Email;
    document.getElementById('telefonoEditar').value = itemeditar.Numero_Telefono;}
  
    
      
  

  // Función para eliminar un registro
  async function eliminarMiembro(id) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      const response = await fetch(`${apiUrl1}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Registro eliminado');
        loadItems();
      } else {
        alert('Error al eliminar el registro');
      }
    }
  location.reload();
  }
  async function eliminarLibro(id) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      const response = await fetch(`${apiUrl2}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Registro eliminado');
        loadItems();
      } else {
        alert('Error al eliminar el registro');
      }
    }
  window.reload();
  }
  async function MostrasPrestados(id) {


      const response = await fetch(`http://localhost:3000/libros/${id}`);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
      }
      const items_libro = await response.json();
      const lirbo_tabla = document.getElementById('libroTable3');
      lirbo_tabla.innerHTML = ''; // Limpia la tabla

      items_libro.forEach(items_libro => 
      {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${items_libro.idLibros}</td>
          <td>${items_libro.Titulo_Libro}</td>
          <td>${items_libro.Autor}</td>
          <td>${items_libro.Editorial}</td>
          <td>${items_libro.Genero}</td>
        `;
        lirbo_tabla.appendChild(row);
      });

  }

  async function Prestamo(event) {
    event.preventDefault();
    const Titulo = document.getElementById("titulo-prestado").value;
    const Miembro = document.getElementById("miembro-prestado").value;
    const respuesta= await fetch(`${apiUrl1}/${Miembro}`);
    const idM= await respuesta.json();
    const {id_Miembro}=idM;
    const data3= {Titulo};
    const options = {
      method:  'PUT' ,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data3)
    };
    const response= await fetch(`${apiUrl2}/prestamo/${id_Miembro}`,options);
    if(response.ok)
    {
      alert("Libro prestado con exito");
    }
    else{
      alert('Error al prestar el libro');
      console.error(response);
    }
    
  }
  
  async function Devolver(event) {
    event.preventDefault();
    const Titulo = document.getElementById("titulo-devuelto").value;
    const Miembro = document.getElementById("miembro-devuelto").value;
    const respuesta= await fetch(`${apiUrl1}/${Miembro}`);
    const idM= await respuesta.json();
    const {id_Miembro}=idM;
    const data3= {Titulo};
    const options = {
      method:  'PUT' ,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data3)
    };
    const response= await fetch(`${apiUrl2}/devolver/${id_Miembro}`,options);
    if(response.ok)
    {
      alert("Libro devuelto con exito");
    }
    else{
      alert('Error al devolver el libro');
      console.error(response);
    }
    
  }

  // Funcion prestamo


  // Inicializa el evento de envío del formulario
  
  
  
  //document.getElementById('registrolibros').addEventListener('submit', guardarLibro);
  //document.getElementById('registromiembro').addEventListener('submit', guardarMiembro);
  // Carga inicial de los registros

  
  