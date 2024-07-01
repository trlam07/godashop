class ContactController {
  //hiển thị form liên hệ
  static form = async (req, res) => {
    try {
      res.render("contact/form", {});
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  //gửi mail liên hệ chủ shop
  static sendEmail = async (req, res) => {
    try {
      const web = `${req.protocol}://${req.headers.host}`;
      const to = process.env.SHOP_OWNER;
      const subject = 'Godashop - liên hệ';
      const content = `
      Chào chủ Shop, <br>
      Dưới đây là thông tin khách hàng liên hệ:<br>
      Tên: ${req.body.fullname} <br>
      Email: ${req.body.email} <br>
      Mobile: ${req.body.mobile} <br>
      Message: ${req.body.content} <br>
      Được gửi từ trang ${web}
      `;
      req.app.locals.helpers.sendEmail(to, subject, content);

      res.end("Gửi mail thành công!!!");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}

module.exports = ContactController;
