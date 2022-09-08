const { response } = require("express");

//usamos req.usuario que ya tiene el usuario cargado en validar-jwt, por eso primero se tiene que ejecutar
// primero ese y dsp este
const esAdminRole = (req, res = response, next ) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'No se validó el token del usuario.'
        });
    }

    const {rol, nombre} = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });

    }
    next();
}

const tieneRole = (...roles) => {

    return(req, res = response, next)=>{

        if(!req.usuario){
            return res.status(500).json({
                msg: 'No se validó el token del usuario.'
            });
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}


module.exports={
    esAdminRole,
    tieneRole
}