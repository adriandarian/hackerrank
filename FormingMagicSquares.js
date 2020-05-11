'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
    let rows = [s[0][0] + s[0][1] + s[0][2], s[1][0] + s[1][1] + s[1][2], s[2][0] + s[2][1] + s[2][2]];
    let columns = [s[0][0] + s[1][0] + s[2][0], s[0][1] + s[1][1] + s[2][1], s[0][2] + s[1][2] + s[2][2]];

    console.log("rows: ", rows)
    console.log("col: ", columns)
    
    let rowCombination = Math.round((rows[0] + rows[1] + rows[2])/3);
    let columnCombination = Math.round((columns[0] + columns[1] + columns[2])/3);
    let combination = Math.round((rowCombination + columnCombination)/2);
    let incorrectRow, incorrectColumn, cost = 0;

    console.log("comb: ", rowCombination, "x", columnCombination, " = ", combination)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let incrementor = 0;

            if (columns[j] !== combination) {
                incrementor = combination - columns[j];
            }

            if (!incrementor) {
                s[i][j] -= combination - columns[j];
                cost += (incrementor < 0) ? -1 * incrementor : incrementor;
            }
        }
    };

    console.log("cost: ", cost)

    return s;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
