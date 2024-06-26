const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');
const InformationController = require('../controllers/InformationController');

// hiển thị trang chủ
router.get('/', HomeController.index)

// hiển thị danh sách sp
router.get('/san-pham.html', ProductController.index)

//hiển thị đường link: /danh-muc/kem-trị-mụn/c3.html
//slug và category_id là do ta đặt
router.get('/danh-muc/:slug/c:category_id.html', ProductController.index)

//tìm kiếm
router.get('/search', ProductController.index)

//chinh-sach-doi-tra.html
router.get('/chinh-sach-doi-tra.html', InformationController.returnPolicy)

//chinh-sach-thanh-toan.html
router.get('/chinh-sach-thanh-toan.html', InformationController.paymentPolicy)

//chinh-sach-giao-hang.html
router.get('/chinh-sach-giao-hang.html', InformationController.deliveryPolicy)

module.exports = router;
