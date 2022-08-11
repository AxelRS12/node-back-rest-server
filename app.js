
require('dotenv').config();//dotenv configura las variables de entorno. se escribe .env

const Server = require('./models/server');

const server = new Server();


server.listen();
