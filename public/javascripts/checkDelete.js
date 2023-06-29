//使用者點擊刪除按鈕時，彈窗再次確認
function checkDelete(){
  let deleteButtons = document.querySelectorAll('#delete')
  Array.from(deleteButtons).forEach((event) => {
    event.addEventListener('click', (event)=>{
      event.preventDefault()
      let result = confirm('確認刪除嗎?');
      if (result === true) {
        // 使用者選擇了確定，提交表單
        var form = document.querySelector('#delete-form');
        form.submit();
      }
    })
  })

}
checkDelete()

