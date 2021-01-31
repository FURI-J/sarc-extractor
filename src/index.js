'use strict';

/**
 * SarcExtractor Class.
 */
class SarcExtractor {
  /**
   * extract file(s) from SARC file.
   * @param {string} sarcFileName - The path of the file to extract.
   */
  extract(sarcFileName) {
    const fs = require('fs');
    const path = require('path');

    const outRootDir = path.join(
        path.dirname(sarcFileName),
        path.basename(sarcFileName, path.extname(sarcFileName)),
    );

    this.buff = fs.readFileSync(sarcFileName);

    // check SARC magic.
    const sarcMagic = this.buff.toString(undefined, 0, 4);
    if (sarcMagic !== 'SARC') {
      throw new Error('Invalid SARC Header.');
    }

    // endian.
    this.isLE = this.buff.readUInt8(0x06) === 0xff;

    // data offset.
    const dataOffset = this.readUInt32(0x0c);

    // node count
    const nodeCount = this.readUInt16(0x14 + 0x06);

    // File Name Table.
    const fileNameTable = this.buff.slice(
        0x14 + 0x0c + 0x10 * nodeCount,
        dataOffset,
    );

    for (let i = 0; i < nodeCount; i++) {
      const nodeHeaderOffset = 0x14 + 0x0c + 0x10 * i;

      // check FileAttributes.
      const fileAttributes = this.readUInt32(nodeHeaderOffset + 0x04);
      if ((fileAttributes & 0x01000000) !== 0x01000000) {
        continue;
      }

      const fileNameTableOffset = 0x08 + (fileAttributes & 0xffff) * 4;
      const nodeStartOffset = this.readUInt32(nodeHeaderOffset + 0x08);
      const nodeEndOffset = this.readUInt32(nodeHeaderOffset + 0x0c);

      const fileName = fileNameTable
          .slice(
              fileNameTableOffset,
              fileNameTable.indexOf(0x00, fileNameTableOffset),
          )
          .toString();

      const node = this.buff.slice(
          dataOffset + nodeStartOffset,
          dataOffset + nodeEndOffset,
      );

      const outPath = path.join(outRootDir, fileName);
      const outDir = path.dirname(outPath);

      console.log('');
      console.log('FileName=' + outPath);
      console.log('FileSize=' + node.length);

      // make parent dir.
      if (
        !fs.existsSync(outDir) &&
        !fs.mkdirSync(outDir, {recursive: true})
      ) {
        throw new Error('Failed to create directory.' + dirname);
      }

      // output file.
      fs.writeFileSync(outPath, node);
    }
  }

  /**
   * readUInt16.
   * @param {integer} offset - Number of bytes to skip before starting to read.
   * @return {integer}
   */
  readUInt16(offset) {
    return this.isLE ?
      this.buff.readUInt16LE(offset) :
      this.buff.readUInt16BE(offset);
  }

  /**
   * readUInt32.
   * @param {integer} offset - Number of bytes to skip before starting to read.
   * @return {integer}
   */
  readUInt32(offset) {
    return this.isLE ?
      this.buff.readUInt32LE(offset) :
      this.buff.readUInt32BE(offset);
  }
};

/**
 * extract file(s) from SARC file.
 * @param {string} sarcFileName - The path of the file to extract.
 */
function extract(sarcFileName) {
  new SarcExtractor().extract(sarcFileName);
}

module.exports.extract = extract;
