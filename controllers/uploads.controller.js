const path = require('path');
const  fs  = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const cargarArchivos = async (req, res = response) => {
    


    try {
        // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'img' );
        res.json({
            nombre
        })
    } catch (msg) {
        res.status(400).json({msg});
    }
}


const actualizarImagen = async(req, res = response) => {

    
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }            
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto'});
    }
    //Limpiar imagenes previas
    if ( modelo.img ) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen) ){
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json({modelo});

}

const mostrarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }            
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se me olvido validar esto'});
    }
    //Limpiar imagenes previas
    if ( modelo.img ) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen) ){
            return res.sendFile( pathImagen);
        }
    }

    res.json({msg: 'falta place holder'});

}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen
}