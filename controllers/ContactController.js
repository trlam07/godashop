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
      const nodemailer = require("nodemailer");
        //cấu hình
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "sonlamhbl2022@gmail.com",
          pass: "cvjg uqww lafj zcbs", //không phải mật khẩu
        },
      });
      await transporter.sendMail({
        from: "sonlamhbl2022@gmail.com", // sender address
        to: "trlam1981@gmail.com", // list of receivers
        subject: "Hello", // Subject line
        html: "<b>Hello godashop</b>", // html body
      });

      res.end("Gửi mail thành công!!!");
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}

module.exports = ContactController;
