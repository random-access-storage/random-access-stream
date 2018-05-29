const from = require('from2')

module.exports = createReadStream

function createReadStream (ras, opts) {
  if (!opts) opts = {}

  var start = opts.start || 0
  var end = opts.end !== undefined ? opts.end : -1
  var opened = false

  return from(read)

  function open (size, cb) {
    if (end !== -1) {
      opened = true
      return read(size, cb)
    }

    if (!ras.statable) return cb(new Error('Storage must be statable'))

    ras.stat(function (err, st) {
      if (err) return cb(err)
      end = st.size
      opened = true
      read(size, cb)
    })
  }

  function read (size, cb) {
    if (!opened) return open(size, cb)
    if (start >= end) return cb(null, null)
    if (start + size > end) size = end - start
    const offset = start
    start += size
    ras.read(offset, size, cb)
  }
}
