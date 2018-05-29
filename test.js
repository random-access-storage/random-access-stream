const tape = require('tape')
const ram = require('random-access-memory')
const createStream = require('./')

tape('small buf', function (t) {
  const buf = Buffer.alloc(1000).fill('abc')
  const st = ram(buf)
  const output = []

  createStream(st)
    .on('data', function (data) {
      output.push(data)
    })
    .on('end', function () {
      t.same(buf, Buffer.concat(output))
      t.end()
    })
})

tape('empty buf', function (t) {
  const buf = Buffer.alloc(0)
  const st = ram(buf)
  const output = []

  createStream(st)
    .on('data', function (data) {
      output.push(data)
    })
    .on('end', function () {
      t.same(buf, Buffer.concat(output))
      t.end()
    })
})
tape('bigger buf', function (t) {
  const buf = Buffer.alloc(20 * 65536).fill('abc')
  const st = ram(buf)
  const output = []

  createStream(st)
    .on('data', function (data) {
      output.push(data)
    })
    .on('end', function () {
      t.same(buf, Buffer.concat(output))
      t.end()
    })
})

tape('bigger buf and start', function (t) {
  const buf = Buffer.alloc(20 * 65536).fill('abc')
  const st = ram(buf)
  const output = []

  createStream(st, {start: 5555})
    .on('data', function (data) {
      output.push(data)
    })
    .on('end', function () {
      t.same(buf.slice(5555), Buffer.concat(output))
      t.end()
    })
})

tape('bigger buf and start and end', function (t) {
  const buf = Buffer.alloc(20 * 65536).fill('abc')
  const st = ram(buf)
  const output = []

  createStream(st, {start: 5555, end: 6666})
    .on('data', function (data) {
      output.push(data)
    })
    .on('end', function () {
      t.same(buf.slice(5555, 6666), Buffer.concat(output))
      t.end()
    })
})
