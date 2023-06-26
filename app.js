//載入必要檔案或套件
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//載入restaurant model
const restaurantModel = require('./models/restaurant')
//載入餐廳資料
const restaurants = require('./restaurant.json')
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
//設定視圖引擎
app.set('view engine' , 'handlebars')

//建立伺服器參數
const port = 3000

//設定路由
app.get('/',(req,res)=>{
  restaurantModel.find()
  .lean()
    .then(data => res.render('index', { restaurants: data }))
    .catch(error => console.error(error))

})

//設定餐廳詳細資料show的動態路由
app.get('/restaurants/:id', (req, res) => {
  //注意params取回的是字串
  const restaurantID = req.params.id
  const restaurantData = restaurants.results.find((data)=>{
    return data.id.toString() === restaurantID 
  })
   res.render('show' , {data : restaurantData })
})

app.get('/search',(req,res)=>{
  //取出關鍵字
  const keyWord = req.query.keyword
  const filterRestaurants = restaurants.results.filter((data)=>{
    //只要名稱或類別其中一個符合就回傳
    return data.name.includes(keyWord) || data.category.includes(keyWord)
  })
  res.render('index', { restaurants: filterRestaurants, keyword: keyWord })
})







//監聽伺服器
app.listen(port , ()=>{
  console.log(`http://localhost:${port}`)
})