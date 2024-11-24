// app.js
const express = require('express');
const connection = require('./DB-PROFESOR.js');
const seguridad = require('cors')

const app = express();
app.use(express.json());
app.use(seguridad());
app.use(express.urlencoded({ extended: true }));

// Ruta para crear un nuevo registro "miembro"
app.post('/miembro', async (req, res) => {
  const { nombre, email, telefono, dni} = req.body;
  if(!nombre || !email )
  {
      
      return res.status(500).json({ error: 'Nombre sin rellenar" ' }); 
      
  }
  if(!email )
    {
        
       return res.status(500).json({ error: 'Email sin rellenar" ' }); 
    }
    if(!dni )
      {
          
          return res.status(500).json({ error: 'DNI sin rellenar" ' }); 
      }
      if(!telefono )
        {
            
           return res.status(500).json({ error: 'Telefono sin rellenar" ' }); 

        }
  try {
    const [result] = await connection.query
    (
      'INSERT INTO miembro (Nombre_Apellido, DNI, Email, Numero_Telefono) VALUES (?, ?, ?, ?)',
      [nombre, dni, email, telefono]
    );
    res.status(201).json({ id: result.insertId }); //201 (Creado)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el miembro ' }); //500 (Error Interno del Servidor)
  }
});
//guardar libros
app.post('/libros', async (req, res) => {
    const { titulo, autor, editorial, genero} = req.body;
    if(!titulo )
      {
          
         return res.status(500).json({ error: 'Titulo sin rellenar" ' }); 

      }
      if(!autor )
        {
            
           return res.status(500).json({ error: 'Autor sin rellenar" ' }); 

        }
        if(!editorial )
          {
              
             return res.status(500).json({ error: 'Editorial sin rellenar" ' }); 
  
          }
          if(!genero )
            {
                
               return res.status(500).json({ error: 'Genero sin rellenar" ' }); 
    
            }
    try {
      const [result] = await connection.query
      (
        'INSERT INTO libros (Titulo_Libro, Autor, Editorial, Genero) VALUES (?, ?, ?, ?)',
        [titulo, autor, editorial, genero]
      );
      res.status(201).json({ id: result.insertId }); //201 (Creado)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el libro ' }); //500 (Error Interno del Servidor)
    }
  });
  

// Ruta para leer todos los registros
app.get('/libros', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM libros');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });  //500 (Error Interno del Servidor)
  }
});

app.get('/miembro', async (req, res) => {
    try {
      const [rows] = await connection.query('SELECT * FROM miembro');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Miembros' });  //500 (Error Interno del Servidor)
    }
  });

// Ruta para leer Los libros prestados de un miembro
app.get('/libros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.query('SELECT idLibros, Titulo_Libro, Autor, Editorial, Genero FROM libros WHERE Id_Miembro = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: ' No se encotraron libros en su poder' });
    //404 (No Encontrado)
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });  //500 (Error Interno del Servidor)
  }
});

// Ruta para actualizar un registro
app.put('/miembro/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, dni } = req.body;

  try {
    const [result] = await connection.query(
      'UPDATE miembro SET Nombre_Apellido = ?, Email = ?, DNI = ?, Numero_Telefono = ? WHERE Id_Miembro = ?',
      [nombre, email, telefono, dni, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Miembro no encontrado' });
    //404 (No Encontrado)
    res.json({ message: 'Miembro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el Miembro' });  //500 (Error Interno del Servidor)
  }
});


app.put('/libros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, genero, editorial } = req.body;
  
    try {
      const [result] = await connection.query(
        'UPDATE libros SET Titulo_Libro = ?, Autor = ?, Editorial= ?, Genero = ?    WHERE idLibros = ?',
        [titulo, autor, editorial, genero, id]
      );
  
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
      //404 (No Encontrado)
      res.json({ message: 'Libro actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el Libro' });  //500 (Error Interno del Servidor)
    }
  });


// PRESTAMOS DE LIBROS 
app.put('/libros/prestamo/:id', async (req, res) => {
    const { id } = req.params;
    const { Titulo } = req.body;
  
    try {
      const [result] = await connection.query(
        'UPDATE libros SET Id_Miembro= ? WHERE Titulo_Libro = ?',
        [id , Titulo]
      );
  
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
      //404 (No Encontrado)
      res.json({ message: 'Libro prestado exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al realizarse el préstamo.' });  //500 (Error Interno del Servidor)
    }
  });
  
  //DEVOLVER LIBRO
  app.put('/libros/devolver/:id', async (req, res) => {
    const { id } = req.params;
    const { Titulo } = req.body;
  
    try {
      const [result] = await connection.query(
        'UPDATE libros SET Id_Miembro= NULL WHERE Titulo_Libro = ? AND Id_Miembro= ? ',
        [Titulo, id]
      );
  
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
      //404 (No Encontrado)
      res.json({ message: 'Libro devuelto exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al realizarse la devolución.' });  //500 (Error Interno del Servidor)
    }
  });
//BUSQUEDA DEL ID A PARTIR DEL NOMBRE MIEMBRO 
app.get('/miembro/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
      const [rows] = await connection.query('SELECT id_Miembro FROM miembro WHERE Nombre_Apellido= ?',[nombre]);
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Miembros' });  //500 (Error Interno del Servidor)
    }
  });
  app.get('/miembro/obterID/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await connection.query('SELECT * FROM miembro WHERE id_Miembro = ?',[id]);
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Miembros' });  //500 (Error Interno del Servidor)
    }
  });
  app.get('/libros/:id/editar', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await connection.query('SELECT idLibros, Titulo_Libro, Autor, Editorial, Genero FROM libros WHERE idLibros = ?',[id]);
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Miembros' });  //500 (Error Interno del Servidor)
    }
  });
//PARA BUSACAR UN MIEMBRO POR ID
  

  
// Ruta para eliminar un registro
app.delete('/libros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query('DELETE FROM libros WHERE idLibros = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Libro no encontrado' });
    //404 (No Encontrado)

    res.json({ message: 'Libro eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el Libro' });  //500 (Error Interno del Servidor)
  }
});

app.delete('/miembro/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await connection.query('DELETE FROM miembro WHERE Id_Miembro = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Miembro no encontrado' });
      //404 (No Encontrado)
  
      res.json({ message: 'Miembro eliminado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el miembro' });  //500 (Error Interno del Servidor)
    }
  });
// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
