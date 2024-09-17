const { dataSource } = require('../database');
const category =require('../entities/entityCategory');

const categories = async (req, res) => {
    try {
      const categoryRepository = dataSource.getRepository(category);
      const categories = await categoryRepository.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error al recuperar las categorías:', error);
      res.status(500).json({ error: 'Error al recuperar las categorías' });
    }
  };
  module.exports = categories;  