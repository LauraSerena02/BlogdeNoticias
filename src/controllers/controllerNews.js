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
      const { adminId, title, description, content, publicationDate, categoryId } = data;
      const imageFile = req.file; // Aquí obtienes el archivo subido desde `multer`
  
      // Verificar que todos los campos necesarios están presentes
      if (!adminId || !title || !description || !content || !publicationDate || !categoryId) {
        return res.status(400).json({ error: 'El contenido no está completo' });
      }
  
      // Obtener el repositorio para la entidad `Category`
      const categoryRepository = dataSource.getRepository(category);
      const existingCategory = await categoryRepository.findOne({ where: { name: categoryId } });
  
      // Verificar si la categoría existe
      if (!existingCategory) {
        return res.status(400).json({ error: 'La categoría no existe' });
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
      const repositorio = dataSource.getRepository(News); // Asegúrate de que `News` esté definido
      const userNewRepository = dataSource.getRepository(User); // Asegúrate de que `User` esté definido
      const userId2 = await userNewRepository.findOne({ where: { userId: adminId } });
      
      if (!userId2) {
        return res.status(401).json({ error: 'No se ha encontrado usuario' });
      }
  
      await repositorio.insert(news2);
  
      // Enviar la respuesta al cliente
      res.status(200).json({ success: true, msg: 'Noticia agregada', userName: userId2.userName, userLastName: userId2.userLastName });
    } catch (error) {
      console.error('Error al ingresar la noticia:', error);
      res.status(500).json({ error: 'Error al ingresar la noticia' });
    }
  };
  
const updateNew = async (req, res) => {
  try {
    const { newsId } = req.params;
    const data = JSON.parse(req.body.data);
    const { adminId, title, description, content, publicationDate, category } = data;

    if (!newsId) {
      return res.status(400).json({ error: 'ID de noticia no proporcionado' });
    }

    const repository = dataSource.getRepository(news);
    const oldNew = await repository.findOne({ where: { newsId } });

    if (!oldNew) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    let photo = oldNew.photo;

    if (req.file) {
      // Eliminar la imagen antigua de Cloudinary si existe una nueva imagen en la solicitud
      if (oldNew.photo) {
        const public_id = oldNew.photo.split('/').pop().split('.')[0];
        await new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(public_id, (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }

      // Subir la nueva imagen a Cloudinary desde el buffer de `multer`
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }).end(req.file.buffer);
      });

      photo = result.secure_url;
    }

    const userNewRepositor = dataSource.getRepository(user);
    const userId2 = await userNewRepositor.findOne({ where: { userId: adminId } });

    
    if (!userId2) {
      return res.status(401).json({ error: 'No se ha encontrado usuario' });
  }


    const updatedFields = {
      adminId: adminId || oldNew.adminId,
      title: title || oldNew.title,
      description: description || oldNew.description,
      content: content || oldNew.content,
      publicationDate: publicationDate || oldNew.publicationDate,
      category: category || oldNew.category,
      photo: photo
    };

    await repository.update({ newsId }, updatedFields);

    console.log('adminId:', adminId);


    res.status(200).json({ success: true, msg: "Noticia actualizada correctamente", userName: userId2.userName, userLastName: userId2.userLastName });
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    res.status(500).json({ error: 'Error al actualizar la noticia' });
  }
};

const deleteNew = async (req, res) => {
  try {
    const { newsId } = req.params;
    if (!newsId) {
      return res.status(400).json({ error: 'ID de noticia no proporcionado' });
    }

    const repository = dataSource.getRepository(news);

    // Busca la noticia para obtener el nombre del archivo de la foto
    const news2 = await repository.findOne({ where: { newsId } });
    if (!news2) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    // Elimina la imagen de Cloudinary si existe una URL de la foto
    if (news2.photo) {
      const public_id = news2.photo.split('/').pop().split('.')[0]; // Obtener el public_id de la URL
      await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(public_id, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    

    // Elimina la noticia de la base de datos
    await repository.delete({ newsId });

    res.json({ msg: "Noticia eliminada correctamente" });
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    res.status(500).json({ error: 'Error al eliminar la noticia' });
  }
};



  


module.exports = {
    allnews,
    showNew,
    createNew,
    updateNew,
    deleteNew
};

