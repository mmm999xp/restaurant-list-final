// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
const restaurantRoute = require('./modules/restaurantRoute')
const users = require('./modules/users')
// 將網址結構符合 / 字串的 request 導向 home 模組 

router.use('/', home)
router.use('/', restaurantRoute)
router.use('/users', users)


module.exports = router