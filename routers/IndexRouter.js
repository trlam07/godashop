const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');
const InformationController = require('../controllers/InformationController');
const ContactController = require('../controllers/ContactController');
const AuthController = require('../controllers/AuthController');
const CustomerController = require('../controllers/CustomerController');
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

//lien-he.html
router.get('/lien-he.html', ContactController.form)

//gửi mail
router.post('/contact/sendEmail', ContactController.sendEmail)

//chi tiết sp
router.get('/san-pham/:slug.html', ProductController.detail)

//lưu đánh giá (ajax)
router.post('/comments', ProductController.storeComment)

//login
router.post('/login', AuthController.login)

//thông tin tk
router.get('/thong-tin-tai-khoan.html', CustomerController.show)

//thông tin tk
router.get('/dia-chi-giao-hang-mac-dinh.html', CustomerController.shippingDefault)

module.exports = router;
