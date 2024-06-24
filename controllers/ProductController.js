const productModel = require('../models/Product');
const categoryModel = require('../models/Category');

class ProductController {
    // hàm hiển thị danh sách
    static index = async(req, res) => {
        try {
            const page = 1;
            const item_per_page = process.env.PRODUCT_ITEM_PER_PAGE; //số lượng sản phẩm/trang
            let conds = []; //không có điều kiện
            let sorts = []; 

            //tìm kiếm theo danh mục
            //SELECT*FROM view_product WHERE category_id = 3;
            // /danh-muc/kem-trị-mụn/c3.html
            const category_id = req.params.category_id;
            if(category_id) {
                conds = {
                    'category_id': {
                        'type': '=',
                        'val': category_id
                    }
                };
            }

            //?price-range = 500000 - 1000000;
            const priceRange = req.query['price-range'];
            if(priceRange) {
                const temp = priceRange.split('-');
                const start = temp[0];
                const end = temp[1];
                conds = {
                    ...conds,
                    'sale_price': {
                        'type': 'BETWEEN',
                        'val': `${start} AND ${end}`
                    }
                };
                //?priceRange >= 1000000
                if(end == 'greater') {
                    conds = {
                        ...conds,
                        'sale_price': {
                            'type': '>=',
                            'val': start
                        }
                    }
                }
            }

            const products = await productModel.getBy(conds, sorts, page, item_per_page)
            //lấy tất cả các danh mục
            const categories = await categoryModel.all();
            res.render('product/index', {
                products: products,
                categories: categories,
                category_id: category_id,
                priceRange
            });
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = ProductController;