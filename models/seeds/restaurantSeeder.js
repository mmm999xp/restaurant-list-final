//產生種子資料的檔案
const mongoose = require('mongoose')
//載入種子資料檔案
const seed = require('./restaurant.json')
const bcrypt = require('bcryptjs')
//載入restaurant model
const restaurantModel = require('../restaurant')
const User = require('../user')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  restaurantsId:[1,2,3] //持有的餐廳id
},{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  restaurantsId: [4, 5, 6] //持有的餐廳id
}]

//連線成功
db.once('open', () => {
  for(let data of SEED_USERS){
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(data.password, salt))
      .then(hash => User.create({
        name: data.name,
        email: data.email,
        password: hash
      }))
      
      .then(user => {
        const userId = user._id
        //篩選出該seeduser的持有餐廳id
        const filterList = seed.results.filter((item) => { return data.restaurantsId.includes(item.id) })
        
        
        for(let key of filterList){
          restaurantModel.create({
            userId: userId,
            name: `${key.name}`,
            name_en: `${key.name_en}`,
            category: `${key.category}`,
            image: `${key.image}`,
            location: `${key.location}`,
            phone: `${key.phone}`,
            google_map: `${key.google_map}`,
            rating: `${key.rating}`,
            description: `${key.description}`
          })
        }
        
      })
      
    
  }
console.log('done')
//process.exit()
})