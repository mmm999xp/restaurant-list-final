//產生種子資料的檔案
const mongoose = require('mongoose')
//載入種子資料檔案
const seed = require('./restaurant.json')
//載入restaurant model
const restaurantModel = require('../restaurant')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')



//連線成功
db.once('open', () => {
  
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