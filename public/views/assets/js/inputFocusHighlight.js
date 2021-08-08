const inputFocusHighlight = (function () {
  var inputFields = document.querySelectorAll('.input-field')

  inputFields.forEach(function (item, index) {
    if (index === 0) {
      item.className += ' input-highlight'
    }

    item.addEventListener('blur', function () {
      this.classList.remove('input-highlight')
    })

    item.addEventListener('focus', function () {
      this.className += ' input-highlight'
    })
  })
})()
