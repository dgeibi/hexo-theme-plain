function Events() {
  this.listeners = {}
}

const addListener = function addListener(type, fn, once) {
  if (!type) throw Error('type of listener required')
  if (typeof fn !== 'function') throw Error('listener required')
  if (!this.listeners[type]) {
    this.listeners[type] = []
  }
  this.listeners[type].push({
    fn,
    once: !!once
  })
  return this
}

const on = function on(type, fn) {
  return addListener.call(this, type, fn)
}

const once = function once(type, fn) {
  return addListener.call(this, type, fn, true)
}

const remove = function remove(type, fn) {
  if (!type) throw Error('type require')
  const listeners = this.listeners[type]
  if (!listeners) return this
  if (typeof fn !== 'function') {
    // remove all listeners
    listeners.splice(0, listeners.length)
  } else {
    listeners.forEach((listener, index, array) => {
      if (listener.fn !== fn) return
      array.splice(index, 1)
    })
  }
  return this
}

const emit = function emit(type, ...args) {
  const listeners = this.listeners[type]
  if (!listeners) return this
  listeners.forEach((listener, index, array) => {
    listener.fn(...args)
    if (listener.once) {
      array.splice(index, 1)
    }
  })
  return this
}

const proto = Events.prototype

proto.emit = emit
proto.on = on
proto.addListener = on
proto.once = once
proto.remove = remove
proto.removeListener = remove

export default Events
