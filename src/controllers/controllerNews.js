const { dataSource } = require('../database'); // Importa la conexión a la base de datos
const news = require('../entities/entityNew'); //Importa el modelo de la entidad 
const user = require('../entities/entityUser');
const cloudinary = require("../utils/cloudinary");


const allnews = async (req, res) => {
  try {
    const repositorio = dataSource.getRepository(news); //Obtiene el repositorio de la entidad
    const news2= await repositorio.find();//se buscan todas las noticias
    res.json(news2);
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    res.status(500).json({ error: 'Error al obtener las noticias' });
  }
};

//Traer noticia por su ID
const showNew = async (req, res) => {
    try {
      const { newsId } = req.params;
      const repositorio = dataSource.getRepository(news);
  
      const news2 = await repositorio.findOne({ where: { newsId: newsId } });
      if (!news2) {
        return res.status(404).json({ error: 'Noticia no encontrada' });
      }
      res.json(news2);
    } catch (error) {
      console.error('Error al obtener la noticia:', error);
      res.status(500).json({ error: 'Error al obtener la noticia' });
    }
  };



const createNew = async (req, res) => {
  try {
     const data = JSON.parse(req.body.data);
    const { adminId, title, description, content, publicationDate, category } = data;
    const imageFile = req.file; // Aquí obtienes el archivo subido desde `multer`

     // Verificar que todos los campos necesarios están presentes
     if (!adminId|| !title|| !description|| !content|| !publicationDate|| !category) {
      return res.status(400).json({ error: 'El contenido no está completo' });
    }


    // Subir la imagen a Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }).end(imageFile.buffer); // `imageFile.buffer` es el archivo en memoria
    });

    // Crear el objeto noticia con la URL de la foto obtenida de Cloudinary
    const photo = result.secure_url;
    const news2 = { adminId, title, description, content, publicationDate, category, photo };

    // Obtener el repositorio y guardar la noticia en la base de datos
    const repositorio = dataSource.getRepository(news);

    const userNewRepositor = dataSource.getRepository(user);
    const userId2 = await  userNewRepositor.findOne({ where: { userId: news.adminId } });
    
    if (!userId2) {
      return res.status(401).json({ error: 'No se ha encontrado usuario' });
  }

  
  await repositorio.insert(news2);

    // Enviar la respuesta al cliente
    res.status(200).json({ success: true, msg: 'Noticia agregada', userName: userId2.userName, userLastName: userId2.userLastName});
  } catch (error) {
    console.error('Error al ingresar la noticia:', error);
    res.status(500).json({ error: 'Error al ingresar la noticia' });
  }
};



  


module.exports = {
    allnews,
    showNew,
    createNew
};

