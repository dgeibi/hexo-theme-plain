/* eslint-env commonjs */
function load(name, definition) {
  var hasExports = typeof exports === 'object' && exports;
  if (hasExports) {
    exports[name] = definition;
  } else {
    this[name] = definition;
  }
}

(function () {
  'use strict';

  function $(selector, context) {
    var range = context || document;
    return range.querySelector(selector);
  }

  $.$ = function $$(selector, context) {
    var range = context || document;
    var elements = null;
    if (typeof selector !== 'string') return [].slice.call(selector);
    elements = range.querySelectorAll(selector);
    return [].slice.call(elements);
  };

  /* https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1 */
  $.scrollToPos = function scrollToPos(scrollPosition, scrollDuration) {
    var target;
    var start;
    var distanceSum;
    var position;
    var duration = 500;


    switch (typeof scrollPosition) {
      case 'string':
        target = document.querySelector(scrollPosition);
        if (target) {
          position = window.pageYOffset + target.getBoundingClientRect().top;
        } else {
          throw new Error('error: No element found with the selector "' + scrollPosition + '"');
        }
        break;
      case 'number':
        if (scrollPosition >= 0) {
          position = scrollPosition;
        } else {
          throw new Error('error: scrollPosition should not be a negative number');
        }
        break;
      default:
        position = 0;
    }

    if (typeof scrollDuration === 'number' && scrollDuration > 0) {
      duration = scrollDuration;
    }

    distanceSum = window.pageYOffset - position;

    function step(timestamp) {
      var percent;
      var distance;
      var moveStep;
      if (!start) {
        start = timestamp;
        requestAnimationFrame(step);
        return;
      }
      percent = Math.min(1, (timestamp - start) / duration);
      distance = (1 - percent) * distanceSum;
      moveStep = position + distance;
      window.scrollTo(0, moveStep);
      if (percent < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  load('$', $);
  load('$$', $.$);
}());
