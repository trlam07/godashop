const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

class HomeController {
    // hàm hiển thị danh sách
    static index = async(req, res) => {
        try {
            const page = 1;
            const item_per_page = 4; //số lượng sản phẩm/trang
            const conds = []; //không có điều kiện
            let sorts = {featured: 'DESC'}; 

            //SELECT * FROM view_product ORDER BY featured DESC LIMIT 0, 4
            const featuredProducts = await productModel.getBy(conds, sorts, page, item_per_page)

            sorts = {created_date: 'DESC'}; 
            //SELECT * FROM view_product ORDER BY created_date DESC LIMIT 0, 4
            const latestProducts = await productModel.getBy(conds, sorts, page, item_per_page)

            //lấy sản phẩm theo danh mục
            //dùng để chứa tất cả các danh mục
            //mỗi danh mục có 2 phần: tên danh mục và sản phẩm kèm theo
            const categoryProducts = [];

            //lấy tất cả các danh mục
            const categories = await categoryModel.all();
            //forof: duyệt từng category để lấy tên và sp tương ứng
            for (const category of categories) {
                const categoryName = category.name;
                //lấy sp theo cùng danh mục (cùng category_id)
                const conds = {
                    'category_id': {
                        'type': '=',
                        'val': category.id,
                    }
                }
                //SELECT * FROM view_product WHERE category_id = 3
                const products = await productModel.getBy(conds, sorts, page, item_per_page)
                //thêm tên danh mục và sp tương ứng vào danh sách để truyền qua view
                categoryProducts.push({
                    categoryName: categoryName,
                    products: products
                })
            }

            res.render('home/index', {
                featuredProducts: featuredProducts,
                latestProducts: latestProducts,
                categoryProducts: categoryProducts
            });
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = HomeController;