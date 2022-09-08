const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');





const validarJWT = async (req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'Error, token no valido o faltante'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - El usuario no existe'
            });
        }

        if(usuario.estado === false){
            return res.status(401).json({
                msg: 'Token no valido - El usuario logueado no está habilitado'
            });
        }


        req.usuario = usuario;

        

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'

        })
    }



    console.log(token);
    

}

module.exports= {
    validarJWT
}