// The JSON object to extract data from
const jsonObject = {
  scheme: 'g16',
  curve: 'bn128',
  proof: {
    a: [
      '0x0fe45bd30c499f0aa5cb67879b66df200b6805f578965ef193f6df852f211c1c',
      '0x22dbc00882591e7269fda8a277483e26b39369451b1e76ef23e18c14f1025e93',
    ],
    b: [
      [
        '0x21fb3cabbf98991d2783219d5851300400c9057ef80be1c0482ad2f0bd30b946',
        '0x27be7cc0f84fcdfe2722f77caad94940ac3d09ebe2935c1e7bb521eb08c6f8df',
      ],
      [
        '0x11a2b80b45ef08019bf2d163e89b36acbc96c05a9ef9d64768fa804cae5f37ad',
        '0x06921f0aa38875ceabef76e03a0c8ccb63908dc75e95a9a7a9285d2d09bb889a',
      ],
    ],
    c: [
      '0x2d2959333a4d831a68304df8b842a9be4cebf5922eb726aa7251f511f1112437',
      '0x238a76759606eafbbb0193bd27ebe559d0532510006a91b7934dfecaf6631239',
    ],
  },
  inputs: [],
};

// Write Json Object to file (original.txt) using writeFileSync
const fs = require('fs');
fs.writeFileSync('original.txt', JSON.stringify(jsonObject));
// Print Byte size
console.log('Original size:', fs.statSync('original.txt').size);

/**
eJwVkMkRADEIw1riCFc5QKD/Ejb7NYPHEuwcqcvQJ2IhU7rU3KJU7xJAqYOsmIfKLAbvy11oCbGxiW
41gDtJ4Bhp7E1PMjvOQ1ocrHEE6111lnjQG88ikEww4RZ3Vm14BF4yf1lccUEGOAAdIDbrUIMNxykv
LfyTK46S1Vg3rJ/tu0NGtGadeePEgWy+EFNDwdJvQ5UQToG3rt9FTKrXfR4cOGDU0kXl8SjW7OrQBs
mYjavH1DcdTufIsuUFjYfwvLG7SU/W7OMETmjv55ID/LY91leSlkEul96mKvdIuhQSzJznOmOqM5wn
uPxQRs3pqZUgmnpyM40EVxDfcKTDRuxpahIKOrlV9Ri4nsfHLBIXhN8LAGgGlgW/9ulcVUbi+ACBso
tF
*/

// Concatenate all elements in proof.a, proof.b, and proof.c
const concatenatedProof = jsonObject.proof.a.concat(jsonObject.proof.b.flat(), jsonObject.proof.c).join('');

// Reverse the concatenation process
function expandProof(concatenatedProof) {
  return {
    a: { X: '0x' + concatenatedProof.slice(0, 64), Y: '0x' + concatenatedProof.slice(64, 128) },
    b: {
      X: ['0x' + concatenatedProof.slice(128, 192), '0x' + concatenatedProof.slice(192, 256)],
      Y: ['0x' + concatenatedProof.slice(256, 320), '0x' + concatenatedProof.slice(320, 384)],
    },
    c: { X: '0x' + concatenatedProof.slice(384, 448), Y: '0x' + concatenatedProof.slice(448, 512) },
  };
}

// Remove all "0x" from the result
let result = concatenatedProof.replace(/0x/g, '');
result = result.toString();

// Write result to file (concatenated.txt) using writeFileSync
fs.writeFileSync('concatenated.txt', result);
// Print Byte size
console.log('Concatenated size:', fs.statSync('concatenated.txt').size);

const pako = require('pako');

// result = 'hello world';
// Compress the result using GZIP
const compressed = pako.deflate(result);
const base64compressed = btoa(String.fromCharCode.apply(null, compressed));
console.log('Base64 compressed:', base64compressed);

// Write base64compressed to file (gzipped.txt) using writeFileSync
fs.writeFileSync('gzipped.txt', base64compressed);
// Print Byte size
console.log('Gzipped size:', fs.statSync('gzipped.txt').size);

// Decode the Base64 string to a string
const decompressed = decompressGZIP(base64compressed);
console.log('🚀 | decompressed:', decompressed);
console.log(decompressed === result);

// Write decompressed to file (decompressed.txt) using writeFileSync
const decompressedExpanded = expandProof(decompressed);
console.log('🚀 | decompressedExpanded:', decompressedExpanded);
function decompressGZIP(base64compressed) {
  const str = atob(base64compressed);

  // Convert the string to an array of uint8
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }
  console.log('🚀 | bytes:', bytes);

  const decompressed = pako.inflate(bytes, { to: 'string' });
  return decompressed;
}
