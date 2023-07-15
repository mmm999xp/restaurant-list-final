# Restaurant_List

這是一個餐廳清單

## 專案畫面
![MyImage](https://github.com/mmm999xp/restaurant-list-final/blob/master/login.png)
![MyImage](https://github.com/mmm999xp/restaurant-list-final/blob/master/Restaurant-List-CRUD.png)

## 專案功能
* 使用者可以在首頁瀏覽全部所有餐廳，並看到他們的簡單資料
  * 餐廳照片
  * 餐廳名稱
  * 餐廳分類
  * 餐廳評分
* 使用者可以瀏覽一家餐廳的詳細資訊
  * 類別
  * 地址
  * 電話
  * 描述
  * 圖片 
* 使用者可以新增一家餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳
* 使用者可以透過搜尋餐廳名稱來找到特定的餐廳
* 使用者可以透過搜尋餐廳類別來找到特定的餐廳
* 使用者可以註冊一個帳號
* 使用者可以以第三方平台(Facebook)進行登入
* 使用者可以登入自己的帳號

## 環境建置
* node.js
* mongoDB
  

## 專案安裝流程
0.請先到mongoDB註冊登入並取得資料庫金鑰(key)

1.確保您的電腦安裝node.js之後開啟終端機輸入以下指令下載專案
```
git clone https://github.com/mmm999xp/restaurant-list-final.git
```
2.進入專案資料夾，根據.env.example 並建立.env檔案，並在其中替換<>中的內容
```
FACEBOOK_ID=<your facebook id>
FACEBOOK_SECRET=<your facebook secret>
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=ThisIsMySecret
MONGODB_URI = mongodb+srv://<user_name>:<password>@cluster0.z4m2yov.mongodb.net/restaurant_list?retryWrites=true&w=majority
```
3.終端機輸入以下指令安裝npm
```
npm install
```
4.終端機輸入以下指令建立種子資料
```
npm run seed
```
5.終端機輸入以下指令開啟伺服器
```
nodemon app.js
```
6.開啟任意瀏覽器輸入網址就可以進入畫面囉
```
http://localhost:3000
```
7.第一次使用需要進行帳號註冊，或使用Facebook進行登入
```
請選擇register或是使用Facebook進行登入
```
8.登入完成後，就可以開始使用本專案的功能囉








