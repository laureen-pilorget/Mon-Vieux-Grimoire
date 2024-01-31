const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books');



router.post('/', bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', bookCtrl.modifyBook);
router.get('/', bookCtrl.getAllBooks);
router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;