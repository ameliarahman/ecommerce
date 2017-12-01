const express = require('express'),
    router = express.Router(),
    transactionController = require('../controllers/transactionController')

/* GET users listing. */
router.post('/', transactionController.createTransaction);
router.get('/:id', transactionController.getTransaction);

module.exports = router;
