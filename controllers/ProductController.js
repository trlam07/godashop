const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

class ProductController {
    // hàm hiển thị danh sách
    static index = async(req, res) => {
        try {
            const page = 1;
            const item_per_page = process.env.PRODUCT_ITEM_PER_PAGE; //số lượng sản phẩm/trang
            const conds = []; //không có điều kiện
            let sorts = []; 
            const products = await productModel.getBy(conds, sorts, page, item_per_page)
            //lấy tất cả các danh mục
            const categories = await categoryModel.all();
            res.render('product/index', {
                products: products,
                categories: categories
            });
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = ProductController;