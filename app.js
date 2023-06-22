//載入必要檔案或套件
const express = require('express')
const exphbs = require('express-handlebars')
//載入餐廳資料
const restaurants = require('./restaurant.json')
const app = express()



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
  res.render('index',{restaurants: restaurants.results} )
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
  console.log(`localhost:${port}`)
})