function $(selector, context) {
  const range = context || document;
  return range.querySelector(selector);
}

function $$(selector, context) {
  const range = context || document;
  let elements = null;
  if (typeof selector !== 'string') return [].slice.call(selector);
  elements = range.querySelectorAll(selector);
  return [].slice.call(elements);
}

export { $, $$ };
