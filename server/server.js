require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API RESTful con Node.js y MySQL!');
});

// Obtener todos los usuarios
// Obtener todos los usuarios
// Obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        console.log("Resultado de la consulta:", rows);
        
        if (rows && rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No se encontraron usuarios' });
        }
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: error.message });
    }
});

  
// Obtener un usuario por ID
app.get('/users', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      const rows = result[0];  // Los resultados de la consulta están en el primer índice del array.
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: error.message });
    }
  });

// Crear un nuevo usuario
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const [result] = await db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age]);
    res.status(201).json({ id: result.insertId, name, email, age });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un usuario por ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const [result] = await db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ id, name, email, age });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un usuario por ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
