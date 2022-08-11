const {response, request} = require('express');

this.res = response;

const getUsuarios =  (req, res = response) => {
    const {q, id, fecha} = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        id,
        fecha
    });
}

const putUsuarios =  (req, res = response) => {
    const {id }= req.params;
    res.status(400).json({
        msg: 'put API - controller',
        id
    });
}

const postUsuarios =  (req = request, res = response) => {
    const {nombre, edad} = req.body;
    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const deleteUsuarios =  (req, res = response) => {

    res.status(202).json({
        msg: 'delete API - controller'
    });
}


module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios
}
