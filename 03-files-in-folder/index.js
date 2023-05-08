const fs = require('fs');

const path = require('path');

const fsPromises = fs.promises;

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
        if (!file.isDirectory()) {
            let nameFile = file.name;

            let filePath = path.join(__dirname, 'secret-folder', nameFile);

            let name = nameFile.split('.', 1);

            let extension = path.extname(file.name);

            fsPromises.stat(filePath).then((res) => {
                console.log(
                    name.toString(),
                    ' - ',
                    extension.replace('.', ''),
                    ' - ',
                    res.size,
                    'bytes'
                );
            });
        }
    });
});
