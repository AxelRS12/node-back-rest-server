
const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearCategoria, getCategorias, getCategoriasById, putCategoria, eliminarCategoria } = require('../controllers/categorias.controller');
const { tieneRole } = require('../middlewares/validar-roles');
const { idCategoriaExistente } = require('../helpers/db-validators');
const router = Router();

//Obtener todas las categorias - publico
router.get('/',getCategorias);



//Obtener una categoria por id
router.get('/:id',[
    check('id', 'El id no existe').isMongoId(),
    check('id').custom(idCategoriaExistente),
    validarCampos
],getCategoriasById);

//Crear una nueva categoria - private - cualquier persona con token
router.post('/',[ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//modificar categoria
router.put('/:id',[
    validarJWT,
    check('id', 'El id no existe').isMongoId(),
    check('id').custom(idCategoriaExistente),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],putCategoria);

//Borrar categoria - Admin only
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no existe').isMongoId(),
    check('id').custom(idCategoriaExistente),
    tieneRole('ADMIN_ROLE'),
    validarCampos
],eliminarCategoria);



module.exports = router;