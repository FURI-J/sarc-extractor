# sarc-extractor
`sarc-extractor` is an npm library that extracts file(s) from [SARC](http://mk8.tockdom.com/wiki/SARC_(File_Format)) file.

[![npm version](https://badge.fury.io/js/sarc-extractor.svg)](https://badge.fury.io/js/sarc-extractor)

## Installation
``` sh
npm i sarc-extractor
```
## Usage
``` js
const sarcExtractor = require('sarc-extractor');
const extractedFileList = sarcExtractor.extract('<SARC file path>');
// --> The file(s) extracted from the SARC file is output to the same directory as the SARC file.
```

Example:
``` js
const sarcExtractor = require('sarc-extractor');
const extractedFileList = sarcExtractor.extract('/home/foo/bar.sarc');
// --> output ["/home/foo/bar/baz.msbt", "/home/foo/bar/qux.msbt"]
```

## npm run
``` sh
npm run extract -- <SARC file path>
```
