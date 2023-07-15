//載入必要檔案或套件
const express = require('express')
const exphbs = require('express-handlebars')
//載入hbs-helpers，這樣才能使用{{#if (eq value1 value2 )}}的判斷
const helpers = require('handlebars-helpers')();
const methodOverride = require('method-override') 
const routes = require('./routes/index')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const app = express()

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
require('./config/mongoose')



//設定樣板引擎，並指定main檔案為全局layout
app.engine('handlebars',exphbs({
  defaultLayout: 'main'
}))

//套入靜態檔案
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//設定視圖引擎
app.set('view engine' , 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

//建立伺服器參數
const port = 3000

app.use(routes)










//監聽伺服器
app.listen(port , ()=>{
  console.log(`http://localhost:${port}`)
})