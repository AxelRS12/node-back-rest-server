
const { Router } = require('express');
const { check } = require('express-validator');


const { cargarArchivos, actualizarArchivo } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/' , cargarArchivos);

router.put('/:coleccion/:id', [
    check('id', 'Debe ser mongo id').isMongoId(),
    //en c recibo la coleccion del user y con la f comparo esa coleccion con las q permito
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivo );


module.exports = router;