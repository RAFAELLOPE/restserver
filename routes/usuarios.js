const { Router} = require('express');
const { check } = require('express-validator');
const {usuariosGet,
       usuariosPost,
       usuariosPut,
       usuariosDelete,
       usuariosPatch} = require('../controlllers/usuarios')
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos')
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators')



router.get('/', usuariosGet );

router.post('/', [
       check('nombre', 'Name is mandatory').not().isEmpty(),
       check('password', 'Password is mandatory and must contain more than 6 letters').isLength({min:6}),
       check('correo', 'Not valid mail').isEmail(),
       check('correo').custom(existeEmail),
       //check('rol', 'It is not a valid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
       check('rol').custom( esRoleValido ),
       validarCampos,
], usuariosPost); // Arreglo de middlewares. El último método es el controlador


router.put('/:id', [
       check('id', 'It is not a valid Mongo ID').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       check('rol').custom( esRoleValido ),
       validarCampos,
], usuariosPut);
router.delete('/:id', usuariosDelete);
router.patch('/', usuariosPatch);

router.delete('/:id', [
       check('id', 'It is not a valid Mongo ID').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       validarCampos,
], usuariosDelete)


module.exports = router;