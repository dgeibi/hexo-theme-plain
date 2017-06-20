/* https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1 */
function scroll(scrollPosition, scrollDuration) {
  let start;
  let position;
  let duration = 500;

  switch (typeof scrollPosition) {
    case 'string': {
      const target = document.querySelector(scrollPosition);
      if (target) {
        position = window.pageYOffset + target.getBoundingClientRect().top;
      } else {
        throw new Error(`error: No element found with the selector "${scrollPosition}"`);
      }
      break;
    }
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

  const distanceSum = window.pageYOffset - position;

  function step(timestamp) {
    if (!start) {
      start = timestamp;
      requestAnimationFrame(step);
      return;
    }
    const percent = Math.min(1, (timestamp - start) / duration);
    const distance = (1 - percent) * distanceSum;
    const moveStep = position + distance;
    window.scrollTo(0, moveStep);
    if (percent < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

export default scroll;
