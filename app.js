//載入必要檔案或套件
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//載入restaurant model
const restaurantModel = require('./models/restaurant')
//載入hbs-helpers，這樣才能使用{{#if (eq value1 value2 )}}的判斷
const helpers = require('handlebars-helpers')();

//載入資料驗證
const checkData = require('./lib/checkData')

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


//設定視圖引擎
app.set('view engine' , 'handlebars')

//建立伺服器參數
const port = 3000

//設定index首頁路由
app.get('/',(req,res)=>{
  
  restaurantModel.find()
  .lean()
    .then(data => res.render('index', { restaurants: data }))
    .catch(error => console.error(error))

})

//設定新增頁面的路由
app.get('/restaurants/new', (req,res)=>{
  res.render('new')
})

//設定create動作
app.post('/new', (req,res)=>{
  //console.log(checkData.checkData(req.body))
  if (checkData.checkData(req.body)){
    restaurantModel.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  }
  

})

//新增編輯頁面路由
app.get('/restaurants/:id/edit' , (req, res)=>{
  //注意params取回的是字串
  const restaurantID = req.params.id
  return restaurantModel.findById(restaurantID)
  .lean()
  .then((data) => res.render('edit' , { data }))
  
})
//新增編輯路由
app.post('/:id/edit' , (req,res)=>{
  // //注意params取回的是字串
  const restaurantID = req.params.id
  const {
    name, name_en, category,
    image, location, phone,
    google_map, rating, description
  } = req.body
  if (checkData.checkData(req.body)){
    return restaurantModel.findById(restaurantID)
      .then((data) => {
        data.name = name
        data.name_en = name_en
        data.category = category
        data.image = image
        data.location = location
        data.phone = phone
        data.google_map = google_map
        data.rating = rating
        data.description = description

        return data.save()
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
  
})

//設定刪除路由
app.post('/:id/delete' , (req,res)=>{
  //注意params取回的是字串
  const restaurantID = req.params.id
  return restaurantModel.findById(restaurantID)
  .then(data => data.remove())
  .then(()=> res.redirect('/'))
  .catch(error => console.log(error))
})


//設定餐廳詳細資料show的動態路由
app.get('/restaurants/:id', (req, res) => {
  //注意params取回的是字串
  const restaurantID = req.params.id
  return restaurantModel.findById(restaurantID)
    .lean()
    .then((data) => res.render('show', { data }))
    .catch(error => console.log(error))
})

app.get('/search',(req,res)=>{
  //取出關鍵字
  const keyWord = req.query.keyword.trim().toLowerCase()
   restaurantModel.find().lean()
     .then((data) => {
      const filterRestaurants = data.filter((filterData)=>{
        return filterData.name.toLowerCase().includes(keyWord) || filterData.category.toLowerCase().includes(keyWord)
      })
       res.render('index', { restaurants: filterRestaurants, keyword: keyWord })
    })
     

})







//監聽伺服器
app.listen(port , ()=>{
  console.log(`http://localhost:${port}`)
})