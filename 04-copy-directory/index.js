const fs = require('fs');

const path = require('path');

const fsPromises = fs.promises;

let pathCopy = path.join(__dirname, 'files-copy');
let pathOriginal = path.join(__dirname, 'files');

fs.mkdir(pathCopy, { recursive: true }, (err, data) => {
    if (err) throw err;
    else {
        fs.readdir(pathOriginal, (err, files) => {
            if (err) throw err;
            else {
                files.forEach((file) => {
                    fs.copyFile(path.join(pathOriginal, file), path.join(pathCopy, file), (err) => {
                        if (err) throw err;
                    });
                });
            }
        });
    }
});
