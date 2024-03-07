const fs = require("fs");

let file = fs.readFileSync(process.argv[2], "utf-8");

const lexicaAnaliser = require('./lexica.js');

const sintaticTopDown = require('./sintatic.js');

let tokens = lexicaAnaliser(file);


sintaticTopDown(tokens);

