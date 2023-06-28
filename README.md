# Restaurant_List

這是一個餐廳清單

## 專案畫面
![MyImage](https://github.com/mmm999xp/restaurant-list-CRUD/blob/master/Restaurant-List-CRUD.png)

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

## 環境建置
* node.js
* mongoDB
  

## 專案安裝流程
0.請先到mongoDB註冊登入並取得資料庫金鑰(key)

1.確保您的電腦安裝node.js之後開啟終端機輸入以下指令下載專案
```
git clone https://github.com/mmm999xp/restaurant-list-CRUD
```
2.進入專案資料夾，並建立.env檔案，並在其中輸入以下內容(<>中的內容請依取得的金鑰做替換)
```
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
4.終端機輸入以下指令開啟伺服器
```
nodemon app.js
```
5.開啟任意瀏覽器輸入網址就可以進入畫面囉
```
http://localhost:3000
```








