const express = require('express');
var cors = require('cors');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares son fx que añaden funcionalidades a mi web server se ejecuta con el server
        this.middleware();
        
        //rutas de app
        this.routes();
    }

    middleware(){
        // lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

        //CORS
        this.app.use(cors());
    }




    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en', this.port);
        });
    }
}
module.exports = Server;