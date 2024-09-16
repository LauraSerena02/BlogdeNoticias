const express = require('express');
const router = express.Router();//Permite crear los endpoints con sus respectivos metodos
const upload = require('../middleware/multer');
const { allnews, showNew, createNew } = require('../controllers/controllerNews');



router.get('/', allnews);
router.get('/:newsId', showNew);
router.post('/createNew', upload.single('image'), createNew );

module.exports = router;
