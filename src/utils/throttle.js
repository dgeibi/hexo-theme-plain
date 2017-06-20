function throttle(actualHandler, time) {
  let resizeTimeout;
  return (...arg) => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        actualHandler(...arg);
      }, time);
    }
  };
}

export default throttle;
