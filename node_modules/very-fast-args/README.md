Very fast way of converting "arguments" into array.

This module does the same than [fast-args](https://github.com/jamen/fast-args), the only difference is that you can call this with `apply`.

Using `function.apply(null, arguments)` works on the optimizing compiler while using `function(arguments)` generates a leaks of the arguments object and prevent optimizations.

This module uses [rest parameters](https://developer.mozilla.org/docs/Web/JavaScript/Referencia/Funciones/parametros_rest) if supported by the javascript engine.

## Installation

```
npm i --save very-fast-args
```

## Usage

```javascript

const fargs = require('very-fast-args');

function myFunc() {
  const args = fargs.apply(null, arguments);
  //do something with args.
}
```

Always use `fargs.apply(null, arguments)` and do not use `fargs(arguments)`.

## Test about optimization

You can test the behavior of the compiler as follows:

```
» node --trace-deopt --trace-opt bench/simple.js | grep arguments
» node --trace-deopt --trace-opt bench/simple-with-fa.js | grep arguments
[disabled Crankshaft for 0x384b6486d409 <SharedFunctionInfo withVeryFastArgs>, reason: Bad value context for arguments value]
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
