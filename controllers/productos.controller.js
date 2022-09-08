const { response } = require("express")
const { Producto } = require('../models')
const usuario = require("../models/usuario")



//todos los productos
const getProductos = async (req, res = response) => {
    const estado = { estado:true }

    const productos = await Producto.find(estado);
    const cantidadProd = await Producto.countDocuments(estado);

    res.status(200).json({
        cantidadProd,
        productos
    })

}

//buscar producto por id
const getProductobyId = async (req, res = response) => {
    
    const { id } = req.params;

    const buscador = await Producto.findById(id);
    
    
    
    res.json({
        buscador
    })


}
//crear producto
const crearProducto = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne( {nombre} );
    //chequeamos si existe
    if (productoDB) {
        return res.status(400).json({
            msg:`El producto ${nombre} ya existe en la bd`
        })
    }
    //Generar datos para guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio     
    }
    //Guardamos los datos
    const producto = new Producto (data);
    await producto.save();

    res.status(201).json(producto);
}

//modificar producto
const modificarProducto = async (req, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const productoModificado = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json({
        productoModificado
    })


}

//Eliminar un producto
const eliminarProducto = async (req, res = response) => {

    const { id } = req.params;
    const estado = {estado : false};

    const productoEliminado = await Producto.findByIdAndUpdate(id, estado, {new: true});
    const usuarioAutenticado = req.usuario;

    res.json({
        productoEliminado,
        usuarioAutenticado
    })
}


    module.exports= {
        getProductos,
        getProductobyId,
        crearProducto,
        modificarProducto,
        eliminarProducto
    }