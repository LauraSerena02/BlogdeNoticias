const express = require('express');
const router = express.Router();//Permite crear los endpoints con sus respectivos metodos
const upload = require('../middleware/multer');
const { allnews, showNew, createNew, updateNew, deleteNew} = require('../controllers/controllerNews');




router.get('/', allnews);
router.get('/:newsId', showNew);
router.post('/createNew', upload.single('image'), createNew );
router.put('/updateNew/:newsId', upload.single('image'), updateNew );
router.delete('/deleteNew/:newsId', deleteNew);

module.exports = router;
