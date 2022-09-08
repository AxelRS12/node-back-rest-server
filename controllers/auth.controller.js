const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response )=>{

    const {correo, password} = req.body;
    try {
        //verificar si mail es existente
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no existen -correo'
            });
        }

        //verificar si usuario esta activo

        if(usuario.estado === false){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no existen -estado false'
            });
        }

        //verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no existen -password false'
            });
        }

        //generar jwt
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salió mal'
        });
    }
}

const googleSignIn = async (req, res = response)=> {

    const { id_token }= req.body;

    try {
        const {nombre, correo, img} = await googleVerify( id_token );

        let usuario = await Usuario.findOne( {correo} );
        
        if (!usuario) {

            const data = {
                nombre,
                correo,
                img,
                password:'1234',
                rol: 'ADMIN_ROLE',         
                google: true
            }
            usuario = new Usuario( data );
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'No tiene los permisos para hacer esto'
            });
        }

          //generar jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            
            ok: false,
            msg: 'El token no se pudo verificar'
    });
    }

    

}

module.exports= {
    login,
    googleSignIn
}