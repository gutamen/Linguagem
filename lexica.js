

let lexicaAnaliser = function(file){

	let tokens = [];

	let type;

	let state = 0;

	let readString = "";

	let keyType = function(compare, line, column) {
	    
	    switch(compare){
		case "_repeater_":
		    return "repeater";

		case "_if_":
		    return "if";
		
		case "_for_":
		    return "for";

		case "_new_":
		    return "new";
		    
		case "_print_":
		    return "print";

		case "_reader_":
		    return "reader";

		default:
		    console.log("Função não reconhecida na linha " + line + " coluna " + column);
		    return "F";

	    }

	}

	let varType = function(compare, line, column){
	    switch(compare){
		case "_Integer_":
		    return "int";
		case "_Char_":
		    return "ch";
		case "_Float":
		    return "ft";
		default:
		    console.log("Tipo não reconhecido na linha " + line + " coluna " + column);
		    return "F";
	    }

	}

	let line = 1;

	let column = 1;

	let iterator = 0;

	while(iterator < file.length){
	   
	    let char = file.at(iterator);

	    if((char === ' ' || char === '\n' || char === '\r') && state != 18 && state != 23 && state != 20 && state != 24 && state != 10 && state != 2 && state != 7 && state != 13 && state != 17 && state != 16 && state != 19 && state != 5 && state != 27 && state != 22 && state != 21){
		    if(char === '\n'){
		        line++;
		        column = 1;
		    }

		    if(char === ' '){
		        column++;
		    }

    		iterator++;
	    	continue;
	    }
	    

	    
	    

	    switch(state){
		case 0:
		    if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)){
		        state = 1;
		        readString+= char;
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

		    console.log(state);
		    state = 0;
		    console.log('erro na linha ' + line + ' coluna ' + column);
		    readString = "";
		    iterator++;
		    continue;
		
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
		    type = keyType(readString, line, column);
		    if(type !== "F"){
		        let member = [readString, type, line, column]
		        tokens.push(member);
		    }    
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
		    tokens.push([readString, "int", line, column]);
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
		    tokens.push([readString, "id", line, column]);
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

		    if("0123456789".includes(char)){
		        state = 8;
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
		    type = varType(readString, line, column);
		    if(type !== "F") tokens.push([readString, "tp", line, column]);
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
		    tokens.push([readString, "ch", line, column]);
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
		    tokens.push([readString, readString.at(readString.length-1), line, column]);
		    readString = "";
		    continue; 

		case 17: // final
		    state = 0;
		    tokens.push([readString, readString.at(readString.length-1), line, column]);
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

		// faltou erro
		    console.log(state);
		    state = 0;
		    console.log('erro na linha ' + line + ' coluna ' + column);
		    readString = "";
		    continue;

		case 19: // final
		    state = 0;
		    tokens.push([readString, "str", line, column]);
		    readString = "";
		    continue; 

		case 20: // final
		    state = 0;
		    tokens.push([readString, readString, line, column]);
		    readString = "";
		    continue; 
		    
		case 21: // final
		    state = 0;
		    tokens.push([readString, readString, line, column]);
		    readString = "";
		    continue; 

		case 22: // final
		    state = 0;
		    tokens.push([readString, "log", line, column]);
		    readString = "";
		    continue; 

		case 23: // final
		    state = 0;
		    tokens.push([readString, "rel", line, column]);
		    readString = "";
		    continue; 
		
		case 24: // final
		    state = 0;
		    tokens.push([readString, readString, line, column]);
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
		    tokens.push([readString, "ft", line, column]);
		    readString = "";
		    continue; 

		case 28: // final
		    state = 0;
		    tokens.push([readString, readString, line, column]);
                readString = "";
                continue; 

        }

        

    }

    return tokens;

}

module.exports = lexicaAnaliser;
