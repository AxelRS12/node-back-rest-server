
const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT } = require('../middlewares/validar-jwt');

const { getProductos, getProductobyId, crearProducto, modificarProducto, eliminarProducto } = require('../controllers/productos.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { idProductoExistente, idCategoriaExistente } = require('../helpers/db-validators');
const { tieneRole } = require('../middlewares/validar-roles');


const router = Router();

//Obtener todas los productos - publico
router.get('/',getProductos);


//Obtener un producto por id
router.get('/:id', [
    check('id', 'El id no existe').isMongoId(),
    check('id').custom(idProductoExistente),
    validarCampos
], getProductobyId);

//Crear un nueva producto - private - cualquier persona con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es mongo id').isMongoId,
    check('categoria').custom(idCategoriaExistente),
    validarCampos
],crearProducto);

//modificar categoria
router.put('/:id',[
    validarJWT,
    check('id').custom(idProductoExistente),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], modificarProducto);

//Borrar categoria - Admin only
router.delete('/:id', [
    validarJWT,
    check('id', 'El id no existe').isMongoId(),
    check('id').custom(idProductoExistente),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], eliminarProducto);



module.exports = router;