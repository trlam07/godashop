const express = require('express');
const dotenv = require('dotenv')
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

app.use(ejsLayouts)

//import global helpers cho toàn bộ project
const helpers = require('./utils/helpers');
app.locals.helpers = helpers; //đưa helpers vào app
//middleware
app.use(cookieParser());

//views là đường dẫn dẫn đến thư mục
app.set('views', './views')

//chỉ định view engine
app.set('view engine', 'ejs')



// chỉ định thư mục public chứa các file css, image, js, ...
app.use(express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname))
console.log(path.join(__dirname, 'public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var fileStoreOptions = {};
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'con ga đang ăn  thóc',
    resave: false,
    saveUninitialized: true,
    //cookie: {secure: true}
  }))

const indexRouter = require('./routers/IndexRouter');

//middleware: tham số của middleware là callback function, ở đây là arrow function
app.use((req, res, next) => {
  app.locals.currentRoute = helpers.getCurrentRoute(req.path);
  app.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
//app.use('/admin', adminRouter);

console.log(process.env.DB_NAME)
app.listen(port, () => {
    console.log(`Server running in ${port}`)
})

