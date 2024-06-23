const productModel = require('../models/Product');
const numeral = require('numeral');

class StudentController {
    // hàm hiển thị danh sách
    static index = async(req, res) => {
        try {
            const page = 1;
            const item_per_page = 4; //số lượng sản phẩm/trang
            const conds = []; //không có điều kiện
            const sorts = {featured: 'DESC'}; 

            //SELECT * FROM view_product ORDER BY featured DESC LIMIT 0, 4
            const featuredProducts = await productModel.getBy(conds, sorts, page, item_per_page)
            res.render('home/index', {
                featuredProducts: featuredProducts,
                numeral: numeral
            });
            res.end()
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = StudentController;