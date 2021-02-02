# sarc-extractor
`sarc-extractor` is an npm package that extracts file(s) from [SARC](http://mk8.tockdom.com/wiki/SARC_(File_Format)) file.

## Installation
[![npm version](https://badge.fury.io/js/sarc-extractor.svg)](https://badge.fury.io/js/sarc-extractor)

``` sh
npm i sarc-extractor
```
## Usage
The file(s) extracted from the SARC file will be output to to the same directory as the SARC file.

``` js
const sarcExtractor = require('sarc-extractor');
const extractedFileList = sarcExtractor.extract('<SARC file path>');
```

### Example
``` js
const sarcExtractor = require('sarc-extractor');
const extractedFileList = sarcExtractor.extract('/home/foo/bar.sarc');
// --> output ["/home/foo/bar/baz.msbt", "/home/foo/bar/qux.msbt"]
```

### npm run
``` sh
npm run extract -- <SARC file path>
```
