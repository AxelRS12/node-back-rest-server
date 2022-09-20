const express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths= {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            buscar:     '/api/buscar',
            uploads:     '/api/uploads'
        }

        

        //conectar a DB
        this.conectarDB();
        
        //Middlewares son fx que añaden funcionalidades a mi web server se ejecuta con el server
        this.middleware();
        
        //rutas de app
        this.routes();
    }


    //BBDD
    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        // lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

        //CORS
        this.app.use(cors());

        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }




    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en', this.port);
        });
    }
}
module.exports = Server;