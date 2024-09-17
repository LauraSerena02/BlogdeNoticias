const { EntitySchema } = require("typeorm");
//entidad de categoria
const category = new EntitySchema({
    name: "category",
    tableName: "tblCategory",
    columns: {
        categoryId: {
            primary: true,
            type: "int",
 
        },
        categoryName:{
            type: "varchar"
        }

        
    },
 
});
//Exportacion de la entidad
module.exports = category;