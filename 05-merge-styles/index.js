const fs = require('fs');

const path = require('path');

let pathStyle = path.join(__dirname, 'styles');
let pathProject = path.join(__dirname, 'project-dist');

fs.readdir(pathStyle, (err, files) => {
    if (err) throw err;
    else {
        files.forEach((file) => {
            if (path.extname(file) == '.css') {
                fs.readFile(path.join(pathStyle, file), 'utf8', (err, data) => {
                    if (err) throw err;
                    else {
                        fs.appendFile(path.join(pathProject, 'bundle.css'), data, (err) => {
                            if (err) throw err;
                        });
                    }
                });
            }
        });
    }
});
