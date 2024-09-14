//Instanciamiento de todos los modulos necesarios
var typeorm = require("typeorm");
const news = require('./entities/entityNew')
const user = require('./entities/entityUser');
const typeUser = require('./entities/entityTypeUser');
const comment = require('./entities/entityComment');
const dotenv = require('dotenv');

dotenv.config();

//Instancia de DataSource de typeorm con la configuración  para conectarse a una base de datos MySQL.
var dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.host,
    port: process.env.portdb,
    username: process.env.usernamedb,
    password: process.env.password,
    database: process.env.database,
    synchronize: false,
    entities: [news, user, typeUser, comment],
});

//Funcion de conexion a la base de datos
async function connection() {
    try {
        await dataSource.initialize();
        console.log('Se ha conectado la base de datos');
    } catch (error) {
        console.log('Ha ocurrido un error ' + error);
    }
}

//Exportacion de los modulos
module.exports = { connection, dataSource };