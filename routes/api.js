const router = require('express').Router();
// const { checkToken } = require('./middlewares');

const blogsApiRouter = require('./api/blogs');
const usuariosApiRouter = require('./api/usuarios');


router.use('/blogs', blogsApiRouter);
router.use('/usuarios', usuariosApiRouter);


module.exports = router;