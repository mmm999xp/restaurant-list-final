//使用者點擊刪除按鈕時，彈窗再次確認
function checkDelete() {
  let deleteButtons = document.querySelectorAll('#delete')
  //console.log(deleteButtons)
  Array.from(deleteButtons).forEach((event) => {
    event.addEventListener('click', (event) => {
      event.preventDefault()

      let result = confirm('確認刪除嗎?');
      if (result === true) {
        // 使用者選擇了確定，提交表單

        
        const form = event.target.parentElement
        form.submit();
      }
    })
  })

}
checkDelete()

