const express = require('express'),
  router = express.Router(),
  bookController = require('../controllers/bookController')

/* GET users listing. */
router.get('/', bookController.getAllDataBook);
router.post('/', bookController.createBook);

module.exports = router;
