const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');

// hiển thị trang chủ
router.get('/', HomeController.index)

// hiển thị danh sách sp
router.get('/san-pham.html', ProductController.index)

module.exports = router;
