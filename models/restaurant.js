//定義餐廳資料的model格式
//載入mongoose
const mongoose = require('mongoose')
//建立schema
const Schema = mongoose.Schema
const restaurantSchema = new Schema ({
  //定義餐廳的資料
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('restaurant' , restaurantSchema)