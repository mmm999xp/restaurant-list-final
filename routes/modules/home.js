// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//載入restaurant model
const restaurantModel = require('../../models/restaurant')

//設定index首頁路由
router.get('/', (req, res) => {
const sort = "排序"
const userId = req.user._id
  restaurantModel.find({ userId })
  .lean()
  .sort({ name: 'asc' })
  .then(data => res.render('index', { restaurants: data, sort1: sort }))
  .catch(error => console.error(error))
  
})


// 匯出路由模組
module.exports = router