const validarArchivoASubir = require('../middlewares/validar-Archivo');
const mismoUsuario = require('../middlewares/mismoUsuario');
const validarCampos = require('../middlewares/validar-campos');
const validarjwt = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarArchivoASubir,
    ...validarCampos,
    ...validarRoles,
    ...validarjwt,
    ...mismoUsuario
}