const { EntitySchema } = require("typeorm");

const news = new EntitySchema({
  name: "news",
  tableName: "tblNews",
  columns: {
      newsId: {
      primary: true,
      type: "int",
      generated: true
    },
    adminId: {
        type: "int"
      },
    title: {
      type: "varchar"
    },
    description: {
      type: "text"
    },
    content: {
      type: "text"
    },
    publicationDate: {
      type: "date"
    },
    category: {
        type: "varchar"
      },
      photo: {
      type: "text" // Cambiado a 'text' para almacenar imágenes
    },
    
  }
});

module.exports = news;
