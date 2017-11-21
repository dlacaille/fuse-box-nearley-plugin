# fuse-box-nearley-plugin
A plugin for fuse-box that lets you import Nearley *.ne files as a grammar for use in a Nearley parser

## Usage
```sh
yarn add fuse-box-nearley-plugin
```

Add to your fuse-box plugins list.

```js
const { NearleyPlugin } = require("fuse-box-nearley-plugin");

fuse = FuseBox.init({
    plugins: [
        NearleyPlugin()
    ]
});
```

Import your grammar into your project, compile, and parse.

```ts
// Import the grammar
const grammar = require("calculator.ne");

// Compile
const compiled = Grammar.fromCompiled(grammar);
const parser = new Parser(compiled);

// Use the grammar
parser.feed("1 + 1 * 2");
console.log(parser.results[0]); // 3
