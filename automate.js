const fs = require("fs");

//console.log('teste');

let file = fs.readFileSync("teste", "utf-8");



let state = 0;

let readString = "";

let iterator = 0;

while(iterator < file.length){
   
    //console.log(file.at(iterator));

    let char = file.at(iterator);

    readString += char;

    if(state == 0){
       if(char in "A-Z"){

        } 

        
    }

    iterator++;
        

}

//console.log(readString);

//if(readString === file)
    //console.log('at');
