const router = require('express').Router();
const Blog = require('../../models/Blog');
const dayjs = require('dayjs');


router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.json(blogs);
        })
        .catch(error => {
            res.json(error);
        });
});


router.delete('/:idBlog', (req, res) => {
    Cliente.findByIdAndRemove(req.params.idBlog)
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