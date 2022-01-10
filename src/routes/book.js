const express = require('express');
const bookController = require('../controllers/book');
const router = express.Router();

router.post('/', bookController.create);
router.get('/', bookController.findAll);
router.get('/:id', bookController.findById);
router.patch('/:id', bookController.updateTitle);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
