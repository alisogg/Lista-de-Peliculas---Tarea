const router = require('express').Router();
const movieController = require('./../src/controllers/movies'); // importamos el controlador

router.get('/movies', movieController.getMovies); // http://localhost:3000/movies
router.post('/movies', movieController.createMovie); 

module.exports = router;