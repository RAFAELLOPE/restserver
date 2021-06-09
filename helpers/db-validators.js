const Role = require('../models/role');
const Usuario = require('../models/usuario');
//Verificar si el correo existe

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`Role ${ rol } is not valid in the database`);
    }  
}


//Verificar si el correo existe
const existeEmail = async( correo ) => {
    
    const usuario = await Usuario.findOne({ correo });
    if ( usuario ){
        throw new Error(`Email ${usuario.correo} already exists`);
    }

}


const existeUsuarioPorId = async( id ) => {
    
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ){
        throw new Error(`The id ${id} does not exists`);
    }

}

module.exports =  { esRoleValido, existeEmail, existeUsuarioPorId};