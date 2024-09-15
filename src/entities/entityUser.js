const { EntitySchema } = require("typeorm");
//entidad de administrador, posee todos los atributos de la tabla administrador
const user = new EntitySchema({
    name: "user",
    tableName: "tblUser",
    columns: {
        userId: {
            primary: true,
            type: "int",
            generated: true,
 
        },
        userTypeId: {
            type: "int",
            default: 2 //Por defecto todos son lectores
 
        },
        email: {
            type: "varchar",
 
        },
        password: {
            type: "varchar",
 
        }
    },
 
});
//Exportacion de la entidad
module.exports = user;