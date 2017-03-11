!(function (name, definition) {
  var hasDefine = typeof define === 'function'
  var hasExports = typeof module === 'object' && module.exports

  if (hasDefine) {
    define(definition)
  } else if (hasExports) {
    module.exports = definition()
  } else {
    this[name] = definition()
  }
})('$', function () {
  function $(selector, context) {
    context = context || document
    return context.querySelector(selector)
  }

  $.$ = function (selector, context) {
    if (typeof selector === 'string') {
      context = context || document
      var elements = context.querySelectorAll(selector)
      return [].slice.call(elements)
    }
    else {
      return [].slice.call(selector)
    }
  }

  /* https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1 */
  $.scrollToPos = function (scrollTo, scrollDuration) {
    if (typeof scrollTo === 'string') {
      var target = document.querySelector(scrollTo)
      if (target) {
        scrollTo = window.pageYOffset + target.getBoundingClientRect().top
      }
      else {
        throw 'error: No element found with the selector "' + scrollTo + '"'
      }
    }
    else if (typeof scrollTo !== 'number') {
      scrollTo = 0
    }
    if (typeof scrollDuration !== 'number' || scrollDuration < 0) {
      scrollDuration = 500
    }
    var distanceSum = window.pageYOffset - scrollTo
    var start = null

    function step(timestamp) {
      if (!start) {
        start = timestamp
        requestAnimationFrame(step)
        return
      }
      var percent = Math.min(1, (timestamp - start) / scrollDuration)
      var distance = (1 - percent) * distanceSum
      var moveStep = scrollTo + distance
      window.scrollTo(0, moveStep)
      if (percent < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }
  return $
})
