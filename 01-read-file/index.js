const fs = require('fs');

const path = require('path');

let file = path.join(__dirname, 'text.txt');

let result = fs.createReadStream(file, 'utf-8');

result.on('data', (data) => console.log(data));
