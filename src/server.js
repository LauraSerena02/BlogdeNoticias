
const express = require ('express'); //Importar librerias
const morgan = require ('morgan');
const { connection } = require('./database');
const cors =require("cors");

const app = express(); //Creo un objeto para usar las funcionalidades de Express

//Inicializacion de coneccion a la DB
connection();

app.use(cors({
    origin: 'http://localhost:5173', // forma de decirle que solo este dominio se puede comunicar
    //credentials:true
}))
//middlewares
app.use(morgan('dev')); //Muestra las peticiones que llegan
app.use(express.json()) //Traducción de peticiones JSON para entendimiento del backend.

//Configuración del puerto
app.set('port', process.env.portbackend || 3000); //Opción con variable de entorno, sino por defecto puerto 3000

//inicializacion del servidor, función en la cual se ejecuta un callback cuando se termine de levantar el servidor. 
//Primer parámetro
//Segundo parametro el servidor
//Callback como medida de comprobacion
app.listen(process.env.portbackend || 3000, () => {
    console.log('servidor en el puerto', app.get('port'));
});

//Rutas
app.use('/login', require('./routes/authentication'));
app.use('/news', require('./routes/news'));


