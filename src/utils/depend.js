import Events from './events';

const emitter = new Events();

const depend = function depend({ key, url, test }) {
  const emit = function emit() {
    emitter.emit(key);
  };
  if (!test()) {
    setTimeout(emit, 0);
    return emitter;
  }
  const script = document.createElement('script');
  script.src = url;
  script.onload = emit;
  document.head.appendChild(script);
  return emitter;
};

// params: key, callback
depend.on = function dependOn(...args) {
  emitter.once(...args);
  return this;
};

depend.emitter = emitter;

export default depend;
