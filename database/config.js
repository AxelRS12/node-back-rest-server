const mongoose = require('mongoose');




const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('BBDD conectada')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hota de iniciar al BBDD');
    }



}






module.exports= {
    dbConnection
}
