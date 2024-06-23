
const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

// hiển thị dssv
router.get('/', HomeController.index)

module.exports = router;
