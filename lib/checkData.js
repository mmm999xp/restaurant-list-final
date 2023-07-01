//後端在做資料驗證時，應該要採用「檢查所有資料若沒有符合格式，才回傳false否則都回傳ture」，還是要「要求所有資料都要符合格式，否則一律都回傳false」

//檢查傳進來的資料格式是否符合預期，若符合回傳true，不符合回傳false
function checkData (object){
//typeof 如果對到一個未被定義的東西會回傳undefined，所以沒有選項必填的時候必須先判斷該item是否存在，若存在才進行驗證

//對於非必填項目的規則，若沒有收到該item，預設會通過驗證，但是若有收到該item就必須驗證，不管有沒有通過驗證都會生成該項的result
  let finalResult = false
  let result1 = false
  let result2 = true
  let result3 = false
  let result4 = true
  let result5 = false
  let result6 = true
  let result7 = true
  let result8 = true
  let result9 = false

  //餐廳名稱(必填)
  result1 = typeof object.name === 'string'
  // if (typeof object.name === 'string' ){
  //   const result1 = true
  // }

  //餐廳英文名稱
  result2 = !object.name_en || typeof object.name_en === 'string'
  // if (object.name_en) {
  //   //假如沒有資料，直接回傳true，如果有資料，驗證是否為字串
  //   if (typeof object.name_en === 'String') {
  //     const result2 = true
  //   } else { const result2 = false }
  // } else { const result2 = true }

  //風格(必填)
  result3 =  typeof object.category === 'string'
 
  
  //圖片
  //ftp或http或https
  //input type="URL"欄位當使用者沒有輸入欄位直接submit，會送出一個空字串
  //若圖片連接並非空字串才驗證裡面的內容
  if (!object.image) {
    if (!object.image.toLowerCase().includes('ftp')) {
      result4 = false
    } else if (!object.image.toLowerCase().includes('http')) {
      result4 = false
    } else if (!object.image.toLowerCase().includes('https')) {
      result4 = false
    }
  }

  //地址(必填)
  result5 = typeof object.location === 'string'
  //電話
  result6 = !object.phone || typeof object.phone === 'string'
  //地圖
  //ftp或http或https
  //input type="URL"欄位當使用者沒有輸入欄位直接submit，會送出一個空字串
  //若圖片連接並非空字串才驗證裡面的內容
  if (object.google_map !== '') {
    if (!object.google_map.toLowerCase().includes('ftp') && !object.google_map.toLowerCase().includes('http')) {
      result7 = false
    } 
  }
  //評分
  if (object.rating){ 
    let rating = Number(object.rating)
    result8 = rating >= 0 && rating <= 5
  }
 
  //描述(必填)
  result9 = typeof object.description === 'string'

console.log(typeof object.rating)
console.log(result1, result2, result3, result4, result5, result6, result7, result8, result9)
//當所有結果都為true，才回傳true，否則一律回傳false
  if (result1 && result2 && result3 && result4 && result5 && result6 && result7 && result8 && result9){
    finalResult = true
  }
  return finalResult
}

module.exports = { checkData }