
const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio'],
    },
    uid: {
        type: String,
    },
    rol: {
        type: String,
        required: true,   
    },
    estado: {
        type: Boolean,
        default: true        
    },
    google: {
        type: Boolean,
        default: false        
    },
    img: {
        type: String
    }

});

usuarioSchema.methods.toJSON = function() {
    const { __v, password,_id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}





module.exports = model('Usuario', usuarioSchema);