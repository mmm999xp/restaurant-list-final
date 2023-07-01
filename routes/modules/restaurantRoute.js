
const express = require('express')
const router = express.Router()
const checkData = require('../../lib/checkData')
//載入restaurant model
const restaurantModel = require('../../models/restaurant')

//設定新增頁面的路由
router.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//設定create動作
router.post('/new', (req, res) => {
  //console.log(checkData.checkData(req.body))
  if (checkData.checkData(req.body)) {
    restaurantModel.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }


})

//新增編輯頁面路由
router.get('/restaurants/:id/edit', (req, res) => {
  //注意params取回的是字串
  const restaurantID = req.params.id
  return restaurantModel.findById(restaurantID)
    .lean()
    .then((data) => res.render('edit', { data }))

})
//新增編輯路由
router.put('/:id', (req, res) => {
  // //注意params取回的是字串
  const restaurantID = req.params.id
  const {
    name, name_en, category,
    image, location, phone,
    google_map, rating, description
  } = req.body
  if (checkData.checkData(req.body)) {
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
router.delete('/:id', (req, res) => {
  //注意params取回的是字串
  const restaurantID = req.params.id
   return restaurantModel.findById(restaurantID)
     .then(data => data.remove())
     .then(() => res.redirect('/'))
     .catch(error => console.log(error))
})


//設定餐廳詳細資料show的動態路由
router.get('/restaurants/:id', (req, res) => {
  //注意params取回的是字串
  const restaurantID = req.params.id
  return restaurantModel.findById(restaurantID)
    .lean()
    .then((data) => res.render('show', { data }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  //取出關鍵字
  const keyWord = req.query.keyword.trim().toLowerCase()
  restaurantModel.find().lean()
    .then((data) => {
      const filterRestaurants = data.filter((filterData) => {
        return filterData.name.toLowerCase().includes(keyWord) || filterData.category.toLowerCase().includes(keyWord)
      })
      res.render('index', { restaurants: filterRestaurants, keyword: keyWord })
    })

})
module.exports = router