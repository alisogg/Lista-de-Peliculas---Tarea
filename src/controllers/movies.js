const { response } = require('express');
const Movie = require('../models/movies')

    class MoviesController {
        ver(req,res){
            const id = req.params.id;
            if(peli){
                res.send(peli);
            }else{
                res.sendStatus(404);
            }
        }

        listar(req, res){
            Movie.find({}).then(response => {
                res.send(response);
            }).catch(err => {
                res.sendStatus(500);
                console.log('Error al listar peliculas: ', err);
            });
        }
    
        crear(req,res) {
            const movieData = req.body;
            const movie = new Movie(movieData);
            movie.save().then(response => {
                console.log('Respuesta: ', response);
                res.sendStatus(201);
            }).catch(err => {
                res.sendStatus(500);
                console.log('Error al crear pelicula: ', err);
            });
        }
    }
    
    module.exports = new MoviesController();