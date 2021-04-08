const router = require('express').Router();
const Blog = require('../../models/Blog');
const dayjs = require('dayjs');
const Usuario = require('../../models/Usuario');
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.json(blogs);
        })
        .catch(error => {
            res.json(error);
        });
});

router.post('/',[
    check('categoria', 'El campo categoria es obligatorio').exists(),
    check('texto', 'El campo texto es obligatorio').exists()
], async (req, res) => {

    // Comprobamos los errores del BODY
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    try {
        req.body.nombre = req.usuarioId;
        req.body.fecha = dayjs().format('DD-MM-YYYY HH:mm:ss');
        const nuevoBlog = await Blog.create(req.body);
        res.json(nuevoBlog);
    } catch (error) {
        res.json(error);
    }
});

router.delete('/:idBlog', (req, res) => {
    Blog.findByIdAndRemove(req.params.idBlog)
        .then(blogBorrado => {
            res.json(blogBorrado);
        }).catch(error => {
            res.json({ error: error.message });
        });
});


router.put('/:idBlog', async (req, res) => {
    try {
        const blogEditado = await Blog.findByIdAndUpdate(req.params.idBlog, req.body, { new: true });
        blogEditado.fecha = dayjs().format('DD-MM-YYYY HH:mm:ss');
        res.json(blogEditado);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;