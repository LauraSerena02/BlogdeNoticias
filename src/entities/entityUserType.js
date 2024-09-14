const { EntitySchema } = require("typeorm");
//entidad de administrador, posee todos los atributos de la tabla administrador
const userType = new EntitySchema({
    name: "userType",
    tableName: "tblUserType",
    columns: {
        userTypeId: {
            primary: true,
            type: "int",
 
        },
        userTypeName: {
            type: "varchar",
 
        }
        
    },
 
});
//Exportacion de la entidad
module.exports = userType;