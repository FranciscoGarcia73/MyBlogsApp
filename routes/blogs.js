const router = require('express').Router();
const Blog = require('../models/Blog');
const dayjs = require('dayjs');


// GET /blogs
router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.render('blogs/blogs', { blogs });
        })
        .catch(error => console.log(error));
});

// GET blogs/new

router.get('/new', (req, res) => {
    res.render('blogs/new', {fecha: dayjs().format('DD-MM-YYYY HH:mm:ss')});
});

router.post('/create', (req, res) => {
    Blog.create(req.body,{fecha: dayjs().format('DD-MM-YYYY HH:mm:ss')})
        .then(nuevoBlog => {
            res.redirect('/blogs');
        })
        .catch(error => console.log(error));
});

// GET /blogs/editar/IDBLOG
router.get('/editar/:idBlog', (req, res) => {
    Blog.findById(req.params.idBlog)
        .then(blog => res.render('blogs/edit', { blog, fecha: dayjs().format('DD-MM-YYYY HH:mm:ss') }))
        .catch(error => console.log(error));
});

router.post('/update', (req, res) => {
    Blog.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(blogEditado => res.redirect('/blogs'))
        .catch(error => console.log(error))
});

// GET /blogs/delete/IDBLOG
router.get('/delete/:idBlog', (req, res) => {
    Blog.findByIdAndDelete(req.params.idBlog)
        .then(blogBorrado => {
            console.log(blogBorrado);
            res.redirect('/blogs');
        })
        .catch(error => console.log(error));
});

module.exports = router;