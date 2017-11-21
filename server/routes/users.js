const express = require('express'),
  router = express.Router(),
  userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.getAllDataUser);

module.exports = router;