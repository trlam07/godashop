class ContactController {
    //hiển thị form liên hệ
    static form = async(req, res) => {
        try {
            res.render('contact/form', {
            });
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    //gửi mail liên hệ chủ shop
    static sendEmail = async(req, res) => {
        try {
            res.end('Gửi mail ba xạo!!!')
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = ContactController;