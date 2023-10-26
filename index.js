const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las solicitudes
const movieRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes con Content-Type: application/json

app.use(express.static(__dirname)); // Para servir archivos estáticos
app.use(movieRoutes); // Para usar las rutas definidas en el archivo index.js


const mongoUrl = 'mongodb+srv://temp_user:temp_user123@cluster0.i6i5esg.mongodb.net/PELICULAS?retryWrites=true&w=majority';

mongoose.connect(mongoUrl).then(() => { // Conectamos a la base de datos
    app.listen(3000, () => {
        console.log('app is running ...');
    });
}).catch(err => {
    console.log('Error al conectar a la base', err);
});