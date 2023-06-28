
let deleteButtons = document.querySelectorAll('#delete')

Array.from(deleteButtons).forEach((event)=>{
  event.addEventListener('click', checkDelete)
})

function checkDelete(event) {
  event.preventDefault()
  let result = confirm('確認刪除嗎?');
  if (result === true) {
    // 使用者選擇了確定，提交表單
    var form = document.querySelector('#delete-form');
    form.submit();
    } else {
      
    }

};

