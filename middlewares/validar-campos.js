const {validationResult} = require('express-validator');

// Los middlewares también son llamados con la request y la response
// pero tiene un tercer argumento que es next (lo que tengo que llamar si pasa)
// Que pase al siguiente middleware hasta el controlador
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}


module.exports= {validarCampos};