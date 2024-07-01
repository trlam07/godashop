const numeral = require('numeral');
const slugify = require('slugify')
//hỗ trợ phân cách phần ngàn tại Việt Nam (vd: 1.000.000)
require('numeral/locales/vi');
numeral.locale('vi')

exports.formatMoney = (money) => {
    return numeral(money).format('0,0')
}

exports.genRouteCategory = (category) => {
    //hiển thị đường link: /danh-muc/kem-trị-mụn/c3.html
    const slug = slugify(category.name, {lower: true});
    const category_id = category.id;
    return `/danh-muc/${slug}/c${category_id}.html`
}
//hàm trả về tên route
exports.getCurrentRoute = (path) => {
    //xóa dấu / trước path: /san-pham.html => san-pham.html
    // nếu chỉ có /: chuyển thành không có /
    //path.slice(1): cắt chuỗi, lấy từ ký tự vị trí 1 trở đi (vị trí đầu tiên là 0)
    path = path.startsWith('/') ? path.slice(1) : path;
    //trang chủ
    if(path === '') {
        return 'home';
    }
    //trang danh sách sp
    //dấu // là biểu thức chính qui regular expression
    //dấu ^ là bắt đầu, $ là kết thúc
    //giả sử path là san-pham.html thì path.match(...) trả về true
    if(path.match(/^san-pham.html$/)) {
        return 'product';
    }
    //tìm kiếm theo danh mục
    if(path.match(/^danh-muc/)) {
        return 'category';
    }

    //tìm kiếm theo từ khóa
    if(path.match(/^search/)) {
        return 'search';
    }

    //liên hệ
    if(path.match(/^lien-he.html$/)) {
        return 'contact';
    }

    if(path.match(/^chinh-sach-doi-tra.html$/)) {
        return 'returnPolicy';
    }

    if(path.match(/^chinh-sach-thanh-toan.html$/)) {
        return 'paymentPolicy';
    }

    if(path.match(/^chinh-sach-giao-hang.html$/)) {
        return 'deliveryPolicy';
    }
}

//Hàm gửi mail
exports.sendEmail = async (to, subject, content) => {
    const nodemailer = require("nodemailer");
        //cấu hình
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_SECRET, //không phải mật khẩu
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USERNAME, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content, // html body
      });
}