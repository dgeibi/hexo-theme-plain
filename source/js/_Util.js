/// <reference path="bliss.js" />
var Util = function(selector, context) {
    context = context || document;
    return context.querySelector(selector);
};

/* gist: a3a669df80898d4097a1e2c01dea52c1 */
Util.scrollToPos = function(scrollTo, scrollDuration) {
    if (typeof scrollTo === 'string') {
        var target = document.querySelector(scrollTo);
        if (target) {
            scrollTo = window.pageYOffset + target.getBoundingClientRect().top;
        } else {
            throw 'error: No element found with the selector "' + scrollTo + '"';
        }
    } else if (typeof scrollTo !== 'number') {
        scrollTo = 0;
    }
    if (typeof scrollDuration !== 'number' || scrollDuration < 0) {
        scrollDuration = 500;
    }
    var cosParameter = (window.pageYOffset - scrollTo) / 2,
        scrollCount = 0,
        oldTimestamp = window.performance.now();

    function step(newTimestamp) {
        var tsDiff = newTimestamp - oldTimestamp;
        scrollCount += Math.PI / (scrollDuration / tsDiff);
        if (scrollCount >= Math.PI) {
            if (scrollTo === 0) {
                window.scrollTo(0, 0);
            }
            return;
        }
        var moveStep = Math.round(scrollTo + cosParameter + cosParameter * Math.cos(scrollCount));
        window.scrollTo(0, moveStep);
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
};

Util.$ = function(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
};

self.$ = self.$ || Util;
self.$$ = self.$$ || Util.$;