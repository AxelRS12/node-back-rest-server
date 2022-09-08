const { response } = require("express");
const { Categoria } = require('../models');
const { res } = require("./usuarios.controllers");

//Obtener categorias - paginado - total -populate
const getCategorias = async (req, res = response) => {

    const estado = {estado : true};
    
        
    const [categorias,total] = await Promise.all([
        Categoria.countDocuments(estado),
        Categoria.find( estado )
            .populate('usuario', 'nombre')
            
    ]);
    
    res.json({
        total,
        categorias
    });
}
//Obtener categoria - populate {}

const getCategoriasById = async (req, res = response) => {

    const { id } = req.params;
    
        
    const categoriaEncontrada = await Categoria.findById(id).populate('usuario', 'nombre');
    
    res.json({
        categoriaEncontrada
    });
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne( {nombre} );

    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }
//Generar data a guardar en bd
    const data = {
        nombre,
        usuario: req.usuario._id
    }


    const categoria = new Categoria (data);
//Guardar data
    await categoria.save();

    res.status(201).json(categoria);
}

//Actualizar categoria

const putCategoria = async (req, res = response) => {
    const { id }= req.params;
    const {estado,usuario, ...data} = req.body;
    const {nombre} = req.body;

    const categoriaDB = await Categoria.findOne( {nombre} );

    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }
    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoriaModificada = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        categoriaModificada
    });
}

//Eliminar categoria


const eliminarCategoria = async(req, res = response) => {
    const { id } = req.params;
    

    const categoriaAEliminar = await Categoria.findByIdAndUpdate(id, {estado : 'false'},  {new: true})
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        categoriaAEliminar,
        usuarioAutenticado,
        msg: `la categoria con id ${id} fue eliminada `        
        
    });

}

module.exports = {
    crearCategoria,
    getCategorias,
    getCategoriasById,
    putCategoria,
    eliminarCategoria
}