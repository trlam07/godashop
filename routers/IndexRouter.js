const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');

// hiển thị trang chủ
router.get('/', HomeController.index)

// hiển thị danh sách sp
router.get('/san-pham.html', ProductController.index)

//hiển thị đường link: /danh-muc/kem-chống-nắng/c3.html
//slug và category_id là do ta đặt
router.get('/danh-muc/:slug/c:category_id.html', ProductController.index)

module.exports = router;
