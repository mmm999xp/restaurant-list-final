//產生種子資料的檔案
const mongoose = require('mongoose')
//載入種子資料檔案
const seed = require('./restaurant.json')
//載入restaurant model
const restaurantModel = require('../restaurant')
if (process.env.NODE_ENV !== 'production') {
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
db.on('error', () => {
  console.log('MongoDB error !')
})
//連線成功
db.once('open', () => {
  console.log('mongoDB connected')
  for(let i = 0 ; i < seed.results.length ; i++){
    restaurantModel.create({

      name: `${seed.results[i].name}`,
      name_en: `${seed.results[i].name_en}`,
      category: `${seed.results[i].category}`,
      image: `${seed.results[i].image}`,
      location: `${seed.results[i].location}`,
      phone: `${seed.results[i].phone}`,
      google_map: `${seed.results[i].google_map}`,
      rating: `${seed.results[i].rating}`,
      description: `${seed.results[i].description}`
    })
  }
  console.log('done')
})