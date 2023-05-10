const fs = require('fs');

const path = require('path');

let pathStyle = path.join(__dirname, 'styles');
let pathProject = path.join(__dirname, 'project-dist');
let pathProjectAssets = path.join(__dirname, 'project-dist', 'assets');
let pathHtml = path.join(__dirname, 'project-dist', 'index.html');

let pathOriginal = path.join(__dirname, 'assets');
let pathCopy = path.join(pathProject, 'assets');
let pathTemplate = path.join(__dirname, 'template.html');
let pathComponents = path.join(__dirname, 'components');

// создает папку

fs.mkdir(pathProject, { recursive: true }, (err, data) => {
    if (err) throw err;
    else {
    }
});

// создает html

fs.createReadStream(pathTemplate, 'utf-8').on('data', function (text) {
    fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach((file, index) => {
            if (file.isFile()) {
                if (path.extname(file.name) === '.html') {
                    fs.createReadStream(path.join(__dirname, 'components', file.name), 'utf-8').on(
                        'data',
                        function (data) {
                            text = text.replace(`{{${file.name.slice(0, -5)}}}`, data);
                            if (files.length === index + 1) {
                                fs.createWriteStream(pathHtml).write(text);
                            }
                        }
                    );
                }
            }
        });
    });
});

// собирает файл стилей
fs.readdir(pathStyle, (err, files) => {
    if (err) throw err;
    else {
        files.forEach((file) => {
            if (path.extname(file) == '.css') {
                fs.readFile(path.join(pathStyle, file), 'utf8', (err, data) => {
                    if (err) throw err;
                    else {
                        fs.appendFile(path.join(pathProject, 'style.css'), data, (err) => {
                            if (err) throw err;
                        });
                    }
                });
            }
        });
    }
});

//  копирование папки assets

fs.mkdir(pathCopy, { recursive: true }, (err, data) => {
    if (err) throw err;
    else {
        startCopyFile(pathOriginal, pathOriginal);
    }
});

function startCopyFile(data, PathtoCopy) {
    fs.readdir(data, function (err, items) {
        for (let i = 0; i < items.length; i++) {
            fs.stat(data + '\\' + items[i], (err, stats) => {
                if (stats.isFile()) {
                    fs.copyFile(data + '\\' + items[i], PathtoCopy + '\\' + items[i], (err) => {
                        if (err) throw err; // не удалось скопировать файл
                        // console.log('Файл успешно скопирован');
                    });
                } else {
                    fs.mkdir(
                        pathProjectAssets + '\\' + items[i],
                        { recursive: true },
                        (err, data) => {
                            if (err) throw err;
                            else {
                            }
                        }
                    );
                    startCopyFile(
                        pathOriginal + '\\' + items[i],
                        pathProjectAssets + '\\' + items[i]
                    );
                }
            });
        }
    });
}
