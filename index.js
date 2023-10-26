const express = require('express');
const mongoose = require('mongoose');
const rutas = require('./routes');

const app = express();

app.get('', (req,res) => {
    res.send('api works!');
})

app.use('', rutas);

const mongoUrl = 'mongodb+srv://temp_user:temp_user123@cluster0.i6i5esg.mongodb.net/PELICULAS?retryWrites=true&w=majority';

mongoose.connect(mongoUrl).then(() => {
    app.listen(3000, () => {
        console.log('app is running ...');
    });
}).catch(err => {
    console.log('Error al conectar a la base', err);
});