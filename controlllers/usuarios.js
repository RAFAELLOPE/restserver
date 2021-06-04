

const usuariosGet = (req, res) => {

    const { q, nombre='No name' }= req.query;

    res.json({
        msg:'get API - Controlador',
        q,
        nombre
    });
}


const usuariosPost = (req, res) => {

    const {nombre, edad}  = req.body;

    res.json({
        msg:'post API - Controlador',
        nombre, 
        edad
    });
}


const usuariosPut = (req, res) => {

    const { id } = req.params;
    res.json({
        msg:'put API - Controlador',
        id
    });
}
const usuariosPatch = (req, res) => {
    res.json({
        msg:'patch API - Controlador'
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg:'delete API - Controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};