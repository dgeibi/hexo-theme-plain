if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function (reg) {
      console.log('Registration succeeded. Scope is ' + reg.scope)
    }).catch(function (error) {
      console.log('Registration failed with ' + error)
    })
}

!(function ($, $$) {
  $$('.post-content>table').forEach(function (table) {
    var div = document.createElement("div")
    div.className = "_table-wrapper"
    var range = document.createRange()
    range.selectNode(table)
    range.surroundContents(div)
  })

  /* back to top */
  var topBtn = $('[data-js-backtotop]')
  var backToTop = function () {
    if (window.pageYOffset > 100) {
      topBtn.classList.add('show')
    } else {
      topBtn.classList.remove('show')
    }
  }
  backToTop()
  window.addEventListener('scroll', backToTop)
  topBtn.addEventListener('click', $.scrollToPos)

  /* toc scroll */
  $$('.toc li a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault()
      var hash = this.hash
      $.scrollToPos(hash)
      window.location.hash = hash
    })
  })
})(this.$, this.$.$)
