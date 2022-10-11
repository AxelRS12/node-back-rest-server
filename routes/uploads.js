
const { Router } = require('express');
const { check } = require('express-validator');


const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivoASubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoASubir, cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivoASubir,
    check('id', 'Debe ser mongo id').isMongoId(),
    //en c recibo la coleccion del user y con la f comparo esa coleccion con las q permito
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary );

router.get('/:coleccion/:id', [
    check('id', 'Debe ser mongo id').isMongoId(),
    //en c recibo la coleccion del user y con la f comparo esa coleccion con las q permito
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos

], mostrarImagen)

module.exports = router;