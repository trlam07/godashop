const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

class ProductController {
    // hàm hiển thị danh sách
    static index = async(req, res) => {
        try {
            

            res.render('product/index', {
                
            });
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = ProductController;