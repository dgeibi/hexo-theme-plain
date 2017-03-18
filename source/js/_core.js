/* global $:false, $$:false */
/* eslint-disable no-console */
; // eslint-disable-line no-extra-semi

(function () {
  'use strict'

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function (reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope)
      }).catch(function (error) {
        console.log('Registration failed with ' + error)
      })
  }

  $$('.post-content>table').forEach(function (table) {
    var div = document.createElement('div')
    var range = document.createRange()
    div.className = '_table-wrapper'
    range.selectNode(table)
    range.surroundContents(div)
  })

    ; // eslint-disable-line no-extra-semi
  /* back to top */
  (function () {
    var topBtn = $('[data-js-backtotop]')
    function backToTop() {
      if (window.pageYOffset > 100) {
        topBtn.classList.add('show')
      } else {
        topBtn.classList.remove('show')
      }
    }
    backToTop()
    window.addEventListener('scroll', backToTop)
    topBtn.addEventListener('click', $.scrollToPos)
  }())


  /* toc scroll */
  $$('.toc li a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var hash = decodeURIComponent(this.hash)
      event.preventDefault()
      $.scrollToPos(hash)
      window.location.hash = hash
    })
  })
}())
