const mysql = require('mysql2');

// Crear la conexión y obtener una interfaz de promesas
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Tu usuario
    password: 'Correa', // Tu contraseña
    database: 'api_database' // Asegúrate de que esta base de datos exista
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Usamos el método promise() para trabajar con promesas
module.exports = connection.promise();
