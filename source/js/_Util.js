var $ = function (selector, context) {
    context = context || document
    return context.querySelector(selector)
}

var $$ = $.$ = function (selector, context) {
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
        } else {
            throw 'error: No element found with the selector "' + scrollTo + '"'
        }
    } else if (typeof scrollTo !== 'number') {
        scrollTo = 0
    }
    if (typeof scrollDuration !== 'number' || scrollDuration < 0) {
        scrollDuration = 500
    }
    var distanceSum = window.pageYOffset - scrollTo,
        scrollCount = 0,
        oldTimestamp = performance.now()

    function step(newTimestamp) {
        var tsDiff = newTimestamp - oldTimestamp
        scrollCount += tsDiff
        var distance = (1 - scrollCount / scrollDuration) * distanceSum
        if (scrollCount >= scrollDuration) {
            window.scrollTo(0, scrollTo)
            return
        }
        var moveStep = Math.round(scrollTo + distance)
        window.scrollTo(0, moveStep)
        oldTimestamp = newTimestamp
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}


