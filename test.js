'use strict'

var test = require('tape')
var Stream = require('.')
var ram = require('random-access-memory')
var raf = require('random-access-file')
var collect = require('collect-stream')
var fs = require('fs')
var join = require('path').join

test('random-access-memory', function (t) {
  var buf = Buffer('Hello cruel world')
  var stream = Stream(ram(buf))
  collect(stream, function (err, _buf) {
    t.error(err)
    t.deepEqual(_buf, buf)
    t.end()
  })
})

test('random-access-file', function (t) {
  var file = join(__dirname, 'index.js')
  var stream = Stream(raf(file))
  collect(stream, function (err, buf) {
    t.error(err)
    t.deepEqual(buf, fs.readFileSync(file))
    t.end()
  })
})
