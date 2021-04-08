const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio']
    },
    fecha:{
        type: String
    },
    titulo: {
        type: String,
        minlength: 6,
        maxlength: 30
    },
    categoria: {
        type: String,
        minlength: 4,
        maxlength: 25
    },
    texto: {
        type: String
       
    }

});

module.exports = mongoose.model('blog', blogSchema);