
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
  const userId = req.user._id
  if (checkData.checkData(req.body)) {
    //加入userId到req.body這個物件中
    req.body.userId = userId
    restaurantModel.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }


})

//新增編輯頁面路由
router.get('/restaurants/:id/edit', (req, res) => {
  //注意params取回的是字串
  const userId = req.user._id
  const restaurantID = req.params.id
  return restaurantModel.findOne({ 
    _id :restaurantID,
     userId })
    .lean()

    .then((data) => res.render('edit', { data }))
    .catch(error => console.log(error))
})

//新增編輯路由
router.put('/:id', (req, res) => {
  // //注意params取回的是字串
  const userId = req.user._id
  const restaurantID = req.params.id
  const {
    name, name_en, category,
    image, location, phone,
    google_map, rating, description
  } = req.body
  if (checkData.checkData(req.body)) {
    return restaurantModel.findOne({ 
      _id: restaurantID,
      userId })
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
  const userId = req.user._id
  const restaurantID = req.params.id
   return restaurantModel.findOne({
     _id: restaurantID 
    ,userId})
     .then(data => data.remove())
     .then(() => res.redirect('/'))
     .catch(error => console.log(error))
})


//設定餐廳詳細資料show的動態路由
router.get('/restaurants/:id', (req, res) => {
  //注意params取回的是字串
  const userId = req.user._id
  const restaurantID = req.params.id
  return restaurantModel.findOne({ 
    _id: restaurantID,
    userId })
    .lean()
    .then((data) => res.render('show', { data }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  //取出關鍵字
  const keyWord = req.query.keyword.trim().toLowerCase()
  //注意params取回的是字串
  const userId = req.user._id

  restaurantModel.find({userId}).lean()
    .then((data) => {
      const filterRestaurants = data.filter((filterData) => {
        return filterData.name.toLowerCase().includes(keyWord) || filterData.category.toLowerCase().includes(keyWord)
      })
      res.render('index', { restaurants: filterRestaurants, keyword: keyWord })
    })

})

router.get('/sort/:sort',(req,res)=>{
  const userId = req.user._id
  const sort = req.params.sort
  let dataBase = restaurantModel.find({ userId }).lean()
  if (sort === "A-Z") {
    dataBase = dataBase.sort({ name: 'asc'})
  } else if (sort === "Z-A") {
    dataBase = dataBase.sort({ name: 'desc' })
  } else if (sort === "類別"){
    dataBase = dataBase.sort({ category: 'asc' })
  } else if (sort === "地區"){
    dataBase = dataBase.sort({ location: 'asc' })
  }

  dataBase
  .then((data) => { 
    res.render('index', { 
      restaurants: data, 
      sort1: sort  
    })
  })
  .catch(error => console.log(error))
})


module.exports = router