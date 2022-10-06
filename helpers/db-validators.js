
const { Categoria, Producto } = require('../models');
const Role = require('../models/role')
const Usuario = require('../models/usuario');


const esValidoElRole = async (rol = '') => {
    const existeRol = await Role.findOne( {rol} );
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
    }
}

const mailExistente = async (correo = '') => {
    const email = await Usuario.findOne( {correo} )
    if (email) {
        throw new Error(`${correo}El correo ya esta registrado`);
    }
}
    
const idExistente = async (id = '') => {

    const existeID = await Usuario.findById( id )
    if (!existeID ) {
        throw new Error(`El id ${id} no existe`);
    }
}


const idCategoriaExistente = async (id = '') => {

    const existeID = await Categoria.findById( id )
    if (!existeID ) {
        throw new Error(`El id ${id} no existe`);
    }
}

const idProductoExistente = async (id = '') => {

    const existeID = await Producto.findById( id )
    if (!existeID ) {
        throw new Error(`El id ${id} no existe`);
    }
}
//validar colecciones
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const existeColeccion = colecciones.includes(coleccion);

    if(!existeColeccion){
        throw new Error(`la coleccion ${coleccion} no esta permitida ${colecciones}`)
    }
    return true;
}


module.exports= {
    esValidoElRole,
    mailExistente,
    idExistente,
    idCategoriaExistente,
    idProductoExistente,
    coleccionesPermitidas
}

