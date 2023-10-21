const { TIMEOUT } = require("dns");
const fs = require("fs");

//console.log('teste');

let file = fs.readFileSync("teste", "utf-8");

let tokens = [];

let state = 0;

let readString = "";

let line = 1;

let column = 1;

let iterator = 1;

while(iterator < file.length){
   
    if((file.at(iterator) === ' ' || file.at(iterator) === '\n' || file.at(iterator) === '\r') && state != 18){
        if(file.at(iterator) === '\n'){
            line++;
            column = 1;
        }

        if(file.at(iterator) === ' '){
            column++;
        }

        iterator++;
        continue;
    }
    

    let char = file.at(iterator);
    /*console.log("//////////////")
    console.log(file.substring(iterator));
    console.log(iterator + " ola");
    console.log(state);
    console.log(char.charCodeAt());*/
    
    

    switch(state){
        case 0:
            if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)){
                state = 1;
                readString+=char;
                iterator++;
                column++;
                continue;
            } 

            if("_".includes(char)){
                state = 4;
                readString+=char;
                iterator++;
                column++;
                continue;
            }

            if("=".includes(char)){
                state = 24;
                readString+=char;
                //tokens.push(readString);
                //readString = "";
                iterator++;
                column++;
                continue;
            }

            if("<>".includes(char)){
                state = 26;
                readString+=char;
                iterator++;
                column++;
                continue;
            }

            if(";".includes(char)){
                state = 20;
                readString+=char;
                iterator++;
                column++;
                //tokens.push(readString);
                //readString = "";
                continue;
            }

            if("'".includes(char)){
                state = 11;
                readString+=char;
                iterator++;
                column++;
                continue;
            }

            if("$".includes(char)){
                state = 15;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if('"'.includes(char)){
                state = 18;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if("0123456789".includes(char)){
                state = 8;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if(":&|!".includes(char)){
                state = 25;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if("/*-+".includes(char)){
                state = 21;
                readString += char;
                iterator++;
                column++;
                //tokens.push(readString);
                //readString = "";
                continue;
            }

            if(",".includes(char)){
                state = 28;
                readString += char;
                iterator++;
                column++;
                continue;
            }
        
        case 1:
            if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)){
                state = 1;
                readString += char;
                iterator++
                column++;
                continue;
            }

            state = 7;
            //tokens.push(readString);
            //readString = "";
            continue;
            
        case 2: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue;

        case 3:
            if("abcdefghijklmnopqrstuvwxyz".includes(char)){
                state = 3;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if("_".includes(char)){
                state = 2;
                readString += char;
                //tokens.push(readString);
                iterator++;
                column++;
                //readString = "";
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 4:
            if("abcdefghijklmnopqrstuvwxyz".includes(char)){
                state = 3;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)){
                state = 9;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 5: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue;

        case 6:
            if("0123456789".includes(char)){
                state = 6;
                readString += char;
                iterator++;
                column++;
                continue;
            }
            
            state = 27;
            //tokens.push(readString);
            //readString = "";
            continue;

        case 7: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue;

        case 8: 
            if(".".includes(char)){
                state = 6;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            state = 5;
            //tokens.push(readString);
            //readString = "";
            continue;
            
        case 9:
            if("abcdefghijklmnopqrstuvwxyz".includes(char)){
                state = 9;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if("_".includes(char)){
                state = 10;
                readString += char;
                //tokens.push(readString);
                iterator++;
                column++;
                //readString = "";
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 10: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue;

        case 11:
            if("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)){
                state = 12;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 12:
            if("'".includes(char)){
                state = 13;
                readString += char;
                //tokens.push(readString);
                iterator++;
                column++;
                //readString = "";
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 13: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue;   

        case 15:
            if("<".includes(char)){
                state = 17;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if(">".includes(char)){
                state = 16;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 16: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

        case 17: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 
        
        case 18:
            if("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?!=+-*/á ".includes(char)){
                state = 18;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            if('"'.includes(char)){
                state = 19;
                readString += char;
                iterator ++;
                column++;
                continue;
            }

        case 19: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

        case 20: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 
            
        case 21: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

        case 22: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

        case 23: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 
        
        case 24: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

        case 25:
            if("|&:!".includes(char)){
                state = 22;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;
        
        case 26:
            if("<>".includes(char)){
                state = 23;
                readString += char;
                iterator++;
                column++;
                continue;
            }

            console.log(state);
            state = 0;
            console.log('erro na linha ' + line + ' coluna ' + column);
            readString = "";
            continue;

        case 27: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

        case 28: // final
            state = 0;
            tokens.push(readString);
            readString = "";
            continue; 

    }

    //iterator++;
        

}

console.log(tokens);

//if(readString === file)
    //console.log('at');
