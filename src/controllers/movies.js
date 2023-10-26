const Movie = require('../models/movies');

exports.getMovies = async (req, res) => { // Obtener todas las películas
    try {
        const movies = await Movie.find(); // Buscamos todas las películas
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message }); // Si hay un error, lo mostramos
    }
};

exports.createMovie = async (req, res) => { // Crear una película
    const movie = new Movie({ // Creamos un nuevo objeto Movie con los datos del formulario
        name: req.body.name,
        synopsis: req.body.synopsis,
        genre: req.body.genre,
        duration: req.body.duration,
        director: req.body.director,
        actors: req.body.actors
    });
    try {
        const newMovie = await movie.save(); // Guardamos la película en la base de datos
        res.status(201).json(newMovie); // Si se guarda correctamente, mostramos el objeto guardado
    } catch (err) {
        res.status(400).json({ message: err.message }); // Si hay un error, lo mostramos
    }
};
