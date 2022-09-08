const { response, request } = require("express")


const usuarioDistintos = (req = request, res = response, next)=> {
    
    const idParametro = req.params.id;
    const idUsuario = req.usuario.id;

    try {
        if (idUsuario === idParametro){
        
            return res.status(401).json({
                msg:`El usuario no puede autoeliminarse`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Algo salio mal'
        });
        
    }
    
    next();
    
}




module.exports = {
    usuarioDistintos
}



