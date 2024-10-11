const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshtokenController');

router.get('/', refreshController.handleRefreshToken);

module.exports = router;