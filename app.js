//載入必要檔案或套件
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//載入restaurant model
const restaurantModel = require('./models/restaurant')
//載入hbs-helpers，這樣才能使用{{#if (eq value1 value2 )}}的判斷
const helpers = require('handlebars-helpers')();
const methodOverride = require('method-override') 
//載入資料驗證
const checkData = require('./lib/checkData')
const routes = require('./routes/index')
const app = express()

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
//連線資料庫，使用環境變數以避免安全性問題
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 })

//取得資料庫的連線狀態(成功或失敗)，並根據結果回傳console訊息
const db = mongoose.connection
//連線異常
db.on('error', ()=>{
  console.log('MongoDB error !')
})
//連線成功
db.once('open', ()=>{
  console.log('mongoDB connected')
})

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

//建立伺服器參數
const port = 3000

app.use(routes)










//監聽伺服器
app.listen(port , ()=>{
  console.log(`http://localhost:${port}`)
})