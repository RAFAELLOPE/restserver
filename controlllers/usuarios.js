const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req, res) => {

    //const { q, nombre='No name' }= req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
               .skip(Number(desde))
               .limit(Number(limite)),
    ])

    res.json({
        total,
        usuarios
    });
}


const usuariosPost = async(req, res) => {

    const { nombre, correo, password, rol }  = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    //Guardar en base de datos
    await usuario.save();

    res.json({
        msg:'post API - Controlador',
        usuario
    });
}


const usuariosPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Verificar que el id existe en la base de datos
    if ( password ){
        //Encriptar la contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    //Actualizar el registro
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}


const usuariosPatch = (req, res) => {
    res.json({
        msg:'patch API - Controlador'
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    //Fisicamente lo borramos 
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Eliminar el usuario simbolicamente
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});

    res.json( usuario );
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};