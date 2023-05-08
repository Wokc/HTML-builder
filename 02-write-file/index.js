const fs = require('fs');

const path = require('path');

const { stdin, stdout, exit } = require('process'); // достаем нужные функции

let result = fs.createWriteStream(path.join(__dirname, 'text.txt')); // создаем файл

stdout.write('Type some text: \n'); //вывод в консоль

// Начинаем чтение из stdin, чтобы процесс не завершился.
stdin.on('data', (data) => {
    //чтение процесса
    if (data.toString().trim() === 'exit') {
        handle();
    }
    result.write(data);
});

function handle() {
    stdout.write('\nThe END!');

    exit(); // стандартная функция процесса для выхода
}

process.on('SIGINT', handle); // использукем стандартные сигналы ноды
process.on('SIGTERM', handle);
