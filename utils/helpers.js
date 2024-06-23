const numeral = require('numeral');
//hỗ trợ phân cách phần ngàn tại Việt Nam (vd: 1.000.000)
require('numeral/locales/vi');
numeral.locale('vi')

exports.formatMoney = (money) => {
    return numeral(money).format('0,0')
}