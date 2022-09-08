const {response, request} = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

this.res = response;

const getUsuarios = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const estado = {estado : true};

    const [total, listaUsuarios] = await Promise.all([
        Usuario.countDocuments(estado),
        Usuario.find( estado ).limit(5)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        listaUsuarios
    });
}

const putUsuarios = async (req, res = response) => {
    const {id }= req.params;
    const {password, google, correo,_id, ...resto} = req.body;

    //Validar contra bbdd
    if(password){
        const salt = bcryptjs.genSaltSync(11);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioModificado = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        usuarioModificado
    });
}

const postUsuarios = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );
    

//Encriptar password
    const salt = bcryptjs.genSaltSync(11);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const deleteUsuarios = async (req, res = response) => {

    const { id } = req.params;
    
    
    await Usuario.findByIdAndUpdate(id, { estado : false })
    const usuarioAutenticado = req.usuario;

    res.status(202).json({
        msg: `El usuario con id ${id} fue eliminado`,
        usuarioAutenticado

    });
}


module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios
}
