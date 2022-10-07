const { response } = require("express")


const validarArchivoASubir = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json('No hay archivos que subir - validarArchivoASubir');
    }
next();
}

module.exports= {
    validarArchivoASubir
}