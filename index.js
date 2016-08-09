'use strict'

var inherits = require('inherits')
var Readable = require('stream').Readable

module.exports = Stream
inherits(Stream, Readable)

function Stream (store) {
  if (!(this instanceof Stream)) return new Stream(store)
  Readable.call(this)
  this._store = store
  this._offset = 0
}

Stream.prototype._read = function (size) {
  var self = this

  if (!this._store.opened) {
    this._store.open(function (err) {
      if (err) return self.emit('error', err)
      self._read(size)
    })
    return
  }

  var length = Math.min(size, this._store.length - this._offset)
  this._store.read(this._offset, length, function (err, data) {
    if (err) return self.emit('error', err)
    self._offset += data.length
    if (data.length === 0) data = null
    self.push(data)
  })
}

