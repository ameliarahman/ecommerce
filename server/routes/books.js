const express = require('express'),
  router = express.Router(),
  bookController = require('../controllers/bookController')

/* GET users listing. */
router.get('/', bookController.getAllDataBook);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateDataBook)
router.delete('/:id', bookController.deleteBook)
module.exports = router;
