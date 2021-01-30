# sarc-extractor
`sarc-extractor` is an npm library that extracts file(s) from [SARC](http://mk8.tockdom.com/wiki/SARC_(File_Format)) file.

## Installation
``` sh
npm install --save sarc-extractor
```
## Usage
``` js
const SarcExtractor = require('sarc-extractor');
new SarcExtractor().extract('<SARC file path>');
// --> The file(s) extracted from the SARC file is output to the same directory as the SARC file.
```

Example:
``` js
const SarcExtractor = require('sarc-extractor');
new SarcExtractor().extract('/home/foo/bar.sarc');
// --> output "/home/foo/bar/baz.msbt"
```