const fs = require("fs");

const codeConstruction = require('./codeConstruction.js');

const lexicaAnaliser = require('./lexica.js');

const sintaticTopDown = require('./sintatic.js');

main();


async function main(){
    let file = fs.readFileSync(process.argv[2], "utf-8");
    let tokens = lexicaAnaliser(file);
    let errors = await sintaticTopDown(tokens);

    if(errors === 0){
        console.log('\nRealizando Construção do Código\n');
        tokens = lexicaAnaliser(file);
        codeConstruction(tokens);
    }
    
}

