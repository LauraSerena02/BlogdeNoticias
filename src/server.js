
const express = require ('express');
const morgan = require ('morgan');
const { connection } = require('./database');

const app = express();

//Inicializacion de coneccion a la DB
connection();

//middlewares
app.use(morgan('dev'));

//seting
app.set('port', process.env.PORT || 3000);

//inicializacion del servidor
app.listen(app.get('port'), () => {
    console.log('servidor en el puerto', app.get('port'));
});


