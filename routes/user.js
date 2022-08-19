
const { Router } = require('express');
const { check } = require('express-validator');


const {esValidoElRole, mailExistente, idExistente} = require('../helpers/db-validators');


const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios } = require('../controllers/usuarios.controllers');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();


router.get('/', getUsuarios);


router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idExistente ),
    check('rol').custom( esValidoElRole ),
    validarCampos
],putUsuarios);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe tener minimo 4 caracteres').isLength( {min:4} ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(mailExistente),
    check('rol').custom( esValidoElRole ),
    validarCampos
] , postUsuarios);


router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idExistente ),
    validarCampos
], deleteUsuarios);

module.exports = router;





// check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE'], ['USER_ROLE']),