

const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");


const cargarArchivos = async (req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json('No hay archivos que subir.');
    }

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

    

module.exports = {
    cargarArchivos
}