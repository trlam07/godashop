const customerModel = require('../models/Customer')
class AuthController {
    static login = async(req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const customer = await customerModel.findEmail(email);
            console.log(customer)
            if(!customer) {
                req.session.message_error = `Lỗi: không tồn tại ${email} trong hệ thống!`;
                //sau khi session được lưu thì sẽ điều hướng đến trang chủ
                req.session.save(() => {
                    res.redirect('/')
                });
                return;
            }
            res.end('Login thành công!!!')          
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = AuthController;