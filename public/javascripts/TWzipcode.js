let twzipcode = new TWzipcode({
  "district": {
    onChange: function (id) {
      //console.log(this.nth(id).get());
    }
  }
});

// 監聽選擇器的變動事件
document.querySelector('.twzipcode').addEventListener('change', function(event) {
  // 獲取選擇的縣市、鄉鎮市區的值
  const county = document.querySelector('.twzipcode select[name="county"]').value;
  const district = document.querySelector('.twzipcode select[name="district"]').value;

  // 將縣市和鄉鎮市區的值填入下方的<input>元素
  document.querySelector('#location').value = county + district;
});

