
# random-access-stream

  Consume a [random-access storage](https://github.com/juliangruber/abstract-random-access) as a readable stream.

## Example

```js
var Stream = require('random-access-stream')
var ram = require('random-access-memory')

var store = ram(Buffer('Hello cruel world'))
var stream = Stream(store)
stream.pipe(process.stdout)
```

## API

### Stream(store[, opts])

Options:

- `start=0` The byte offset at which to start reading
- `end=Infinity` The byte offset at which to end reading

## License

  MIT
