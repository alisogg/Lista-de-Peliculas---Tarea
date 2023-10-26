const router = require('express').Router();

const authMiddleware = require('./../src/middlewares/auth');
const moviesController = require('./../src/controllers/movies');

router.use('/movies',authMiddleware);

router.get('/movies',moviesController.listar);
router.post('/movies', moviesController.crear);
// router.delete('/movies/:id',moviesController.eliminar);

module.exports = router;