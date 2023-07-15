// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
const restaurantRoute = require('./modules/restaurantRoute')
const users = require('./modules/users')
const auth = require('./modules/auth')
// 將網址結構符合 / 字串的 request 導向 home 模組 
const { authenticator } = require('../middleware/auth')  // 掛載 middleware


router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/', authenticator, restaurantRoute)


module.exports = router