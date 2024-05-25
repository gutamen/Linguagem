const tableEntry = require("./tableEntry.js");
const type = require("./type.js")
 
let sintaticTopDown = async function(tokens){
    let stack = [];
    stack.push("$", "<programa>");
    tokens.push(["","$", 0, 0]);
//    console.log(tokens);
    let symbolTable = [];
    let errorCount = 0;
    let semanticTime = false;
    let semanticAnalysis = [];

    let sintaxErrorPrint = function (string, line, column){
        console.log("--- ERRO SINTÁTICO ---");
        console.log("Linha == ", line);
        console.log("Posição == ", column);
        console.log(string);
        console.log();
    }

    while(true){
        if(tokens.length == 0){
            console.log("Quantidade de erros == ", errorCount);
            console.log("Parada forçada");
            break;
        }

        let stackTop = stack[stack.length - 1];
        let tokenFirst = tokens[0][1];
        
//        console.log(tokenFirst);
//        console.log(stackTop);

        if(stackTop.includes("<") && stackTop.includes(">")){ // é um não terminal

            switch(stackTop){
                case "<programa>":
                    switch(tokenFirst){
                        case ";":
                            stack.pop();
                            stack.push("<declaracoes>");
                            break;

                        case "new":
                            stack.pop();
                            stack.push("<declaracoes>");
                            stack.push("<declaracoes>");
                            break;

                        case "id":
                            stack.pop();
                            stack.push("<declaracoes>");
                            break;

                        case "repeater":
                            stack.pop();
                            stack.push("<declaracoes>");
                            break;

                        case "if":
                            stack.pop();
                            stack.push("<declaracoes>");
                            break;

                        case "for":
                            stack.pop();
                            stack.push("<declaracoes>");
                            break;

                        case "print":
                            stack.pop();
                            stack.push("<declaracoes>");
                            break;

                        case "reader":
                            stack.pop();
                            stack.push("<declaracoes>");
                         break;


                        default:
                            sintaxErrorPrint("Esperado função, declaração, atribuição ou fim de linha", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<declaracoes>":
                    switch(tokenFirst){
                        case ";":
                            stack.pop();
                            break;

                        case "new":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;

                        case "id":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;

                        case "repeater":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;

                        case "if":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;

                        case "for":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;

                        case "print":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;

                        case "reader":
                            stack.pop();
                            stack.push("<declaracoes>", ";", "<declaracao>")
                            break;
                        
                        case "<":
                            stack.pop();
                            break;

                        case "$":
                            stack.pop();
                            break;

                        default:
                            sintaxErrorPrint("Esperado função, declaração, atribuição ou fim de linha", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<declaracao>":
                    switch(tokenFirst){
                        case "new":
                            stack.pop();
                            stack.push("<declaracao-tipo>");
                            break;

                        case "id":
                            stack.pop();
                            stack.push("<atribuicao>");
                            break;
                          
                        case "repeater":
                            stack.pop();
                            stack.push("<funcao>");
                            break;
                          
                        case "if":
                            stack.pop();
                            stack.push("<funcao>");
                            break;
                          
                        case "for":
                            stack.pop();
                            stack.push("<funcao>");
                            break;
                          
                        case "print":
                            stack.pop();
                            stack.push("<funcao>");
                            break;
                          
                        case "reader":
                            stack.pop();
                            stack.push("<funcao>");
                            break;

                        default:
                            sintaxErrorPrint("Esperado função, atribuição ou declaração", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<declaracao-tipo>":
                    switch(tokenFirst){
                        case "new":
                            stack.pop();
                            stack.push("[novaVariavel]", "id", "tp", "new");
                            semanticTime = true;
//                            stack.push("id", "tp", "new");
                            break;

                        default:
                            sintaxErrorPrint("Esperado uma declação", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<atribuicao>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("[verificaAtribuicao]", "<tipo-atribuicao>", "=", "id");
                            semanticTime = true;
//                            stack.push("<tipo-atribuicao>", "=", "id");
                            break;

                        default:
                            sintaxErrorPrint("Esperado uma atribuição", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<tipo-atribuicao>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<multi-char>");
                            break;

                        case "ch":
                            stack.pop();
                            stack.push("<multi-char>");
                            break;

                        case "int":
                            stack.pop();
                            stack.push("<multi-char>");
                            break;

                        case "ft":
                            stack.pop();
                            stack.push("<multi-char>");
                            break;

                        default:
                            sintaxErrorPrint("Esperado um valor, caractere ou variável", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<multi>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>");
                            break;

                        case "int":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>");
                            break;

                        case "ft":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>");
                            break;

                        default:
                            sintaxErrorPrint("Esperado valor ou variável", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<multi-linha>":
                    switch(tokenFirst){
                        case ";":
                            stack.pop();
                            break;

                        case "*":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>", "*");
                            break;

                        case "/":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>", "/");
                            break;

                        case "+":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>", "+");
                            break;

                        case "-":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>", "-");
                            break;                       

                        case "log":
                            stack.pop();
                            break;

                        case "rel":
                            stack.pop();
                            break;
                        
                        case ">":
                            stack.pop();
                            break;

                        default:
                            sintaxErrorPrint("Esperado operador, fim de linha ou começo de bloco", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<tipo-expressao>":
                    switch(tokenFirst){
                        case ";":
                            stack.pop();
                            break;

/*
                        case "*":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>", "*");
                            break;

                        case "/":
                            stack.pop();
                            stack.push("<multi-linha>", "<termo>", "/");
                            break;
 */
                        case "+":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>", "+");
                            break;

                        case "-":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>", "-");
                            break;                       

                        case "log":
                            stack.pop();
                            break;

                        case "rel":
                            stack.pop();
                            break;
                        
                        case ">":
                            stack.pop();
                            break;

                        default:
                            sintaxErrorPrint("Esperado operador, fim de linha ou começo de bloco\nMultiplicação primeiro", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<termo>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("id");
                            break;

                        case "int":
                            stack.pop();
                            stack.push("int");
                            break;

                        case "ft":
                            stack.pop();
                            stack.push("ft");
                            break;

                        default:
                            sintaxErrorPrint("Esperado um valor ou uma variável", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<funcao>":
                    switch(tokenFirst){
                        case "repeater":
                            stack.pop();
                            stack.push("<sera>", "repeater");
//                            stack.push("[verificaBooleano]", "<sera>", "repeater");
//                            semanticTime = true;
                            break;

                        case "if":
                            stack.pop();
                            stack.push("[verificaBooleano]", "<sera>", "if");
                            semanticTime = true;
                            break;

                        case "for":
                            stack.pop();
                            stack.push("<", "<declaracoes>", ">", "id", ",", "int", ",", "int", "for");
                            break;

                        case "print":
                            stack.pop();
                            stack.push("<impressao>", "print");
                            break;

                        case "reader":
                            stack.pop();
                            stack.push("id", "reader");
                            break;

                        default:
                            sintaxErrorPrint("Esperado uma função", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<impressao>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("id");
                            break;

                        case "str":
                            stack.pop();
                            stack.push("str");
                            break;

                        default:
                            sintaxErrorPrint("Esperado uma variável ou uma string", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<multi-char>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<multi>");
                            break;

                        case "ch":
                            stack.pop();
                            stack.push("ch");
                            break;

                        case "int":
                            stack.pop();
                            stack.push("<multi>");
                            break;

                        case "ft":
                            stack.pop();
                            stack.push("<multi>");
                            break;

                        default:
                            sintaxErrorPrint("Esperado um valor, uma variável ou um caractere", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<sera>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<sera-var>", "<multi-char>");
                            break;

                        case "ch":
                            stack.pop();
                            stack.push("<sera-var>", "<multi-char>");
                            break;
                        
                        case "int":
                            stack.pop();
                            stack.push("<sera-var>", "<multi-char>");
                            break;
                        
                        case "ft":
                            stack.pop();
                            stack.push("<sera-var>", "<multi-char>");
                            break;
                        
                        default:
                            sintaxErrorPrint("Esperado um valor, uma variável ou um caractere", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<sera-var>":
                    switch(tokenFirst){
                        case "log":
                            stack.pop();
                            stack.push("<", "<declaracoes>", ">", "<log-rel>", "log");
                            break;
                        
                        case "rel":
                            stack.pop();
                            stack.push("<", "<declaracoes>", ">", "<log-rel>", "rel");
                            break;

                        default:
                            sintaxErrorPrint("Esperado um operador lógico ou relacional", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<log-rel>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<log-rel-var>", "<multi-char>");
                            break;

                         case "ch":
                            stack.pop();
                            stack.push("<log-rel-var>", "<multi-char>");
                            break;

                        case "int":
                            stack.pop();
                            stack.push("<log-rel-var>", "<multi-char>");
                            break;

                        case "ft":
                            stack.pop();
                            stack.push("<log-rel-var>", "<multi-char>");
                            break;

                        default:
                            sintaxErrorPrint("Esperado um valor, uma variável ou um caractere", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<log-rel-var>":
                    switch(tokenFirst){
                        case "log":
                            stack.pop();
                            stack.push("<log-rel-var>", "<multi-char>", "log");
                            break;

                        case "rel":
                            stack.pop();
                            stack.push("<log-rel-var>", "<multi-char>", "rel");
                            break;

                        case ">":
                            stack.pop();
                            break;

                        default:
                            sintaxErrorPrint("Esperado um operador lógico ou relacional, ou fim de bloco", tokens[0][2], tokens[0][3]);
                            removeLineError(tokens);
                            semanticAnalysis = [];
                            semanticTime = false;
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                default:
                    console.log("Erro: não terminal não existe, ou não foi colocado")   // Esse erro a princípio é inalcançável
            }
        }
        else if(stackTop.includes("[") && stackTop.includes("]")){
//            console.log(tokens);
//            console.log();
//            console.log(stack);
            
            if(!semanticProcess(stack[stack.length - 1], semanticAnalysis, symbolTable)) errorCount++;
//            console.log(errorCount);
            semanticTime = false;
            semanticAnalysis = [];
            stack.pop();
//            console.log(symbolTable);
//            break;
            
            
        }
        else{ 
            // é um terminal
            if(tokenFirst === stackTop && tokenFirst !== '$'){
                stack.pop();
                if(semanticTime){
                    semanticAnalysis.push(tokens.shift());
                }
                else{
                    tokens.shift();
                }
            }
            else if(tokenFirst === '$' && stackTop === '$'){
                console.log("Código análisado com ", errorCount, " erros");
                break;
            }else{
                switch(stackTop){
                    case ";":
                        sintaxErrorPrint("Finalização de linha ';'", tokens[0][2], tokens[0][3]);
                        break;

                    case "new":
                        sintaxErrorPrint("Esperado flag '_new_'", tokens[0][2], tokens[0][3]);
                        break;

                    case "tp":
                        sintaxErrorPrint("Esperado tipo de variável", tokens[0][2], tokens[0][3]);
                        break;

                    case "id":
                        sintaxErrorPrint("Esperado variável", tokens[0][2], tokens[0][3]);
                        break;

                    case "=":
                        sintaxErrorPrint("Esperado indicador de atribuição '='", tokens[0][2], tokens[0][3]);
                        break;

                    case "*":
                        sintaxErrorPrint("Esperado operador", tokens[0][2], tokens[0][3]);
                        break;

                    case "/":
                        sintaxErrorPrint("Esperado operador", tokens[0][2], tokens[0][3]);
                        break;

                    case "+":
                        sintaxErrorPrint("Esperado operador", tokens[0][2], tokens[0][3]);
                        break;

                    case "-":
                        sintaxErrorPrint("Esperado operador", tokens[0][2], tokens[0][3]);
                        break;

                    case "ft":
                        sintaxErrorPrint("Esperado ponto flutuante", tokens[0][2], tokens[0][3]);
                        break;

                    case "int":
                        sintaxErrorPrint("Esperado valor inteiro", tokens[0][2], tokens[0][3]);
                        break;

                    case "ch":
                        sintaxErrorPrint("Esperado caraactere", tokens[0][2], tokens[0][3]);
                        break;

                    case "str":
                        sintaxErrorPrint("Esperado string", tokens[0][2], tokens[0][3]);
                        break;

                    case "repeater":
                        sintaxErrorPrint("Esperado função", tokens[0][2], tokens[0][3]);
                        break;

                    case "if":
                        sintaxErrorPrint("Esperado função", tokens[0][2], tokens[0][3]);
                        break;

                    case "for":
                        sintaxErrorPrint("Esperado função", tokens[0][2], tokens[0][3]);
                        break;

                    case "print":
                        sintaxErrorPrint("Esperado função", tokens[0][2], tokens[0][3]);
                        break;

                    case "reader":
                        sintaxErrorPrint("Esperado função", tokens[0][2], tokens[0][3]);
                        break;

                    case ",":
                        sintaxErrorPrint("Esperado vígurla ','", tokens[0][2], tokens[0][3]);
                        break;

                    case ">":
                        sintaxErrorPrint("Esperado abertura de bloco '$>'", tokens[0][2], tokens[0][3]);
                        break;

                    case "<":
                        sintaxErrorPrint("Esperado fechamento de bloco '<$'", tokens[0][2], tokens[0][3]);
                        break;

                    case "log":
                        sintaxErrorPrint("Esperado operador lógico", tokens[0][2], tokens[0][3]);
                        break;

                    case "rel":
                        sintaxErrorPrint("Esperado operador relacional", tokens[0][2], tokens[0][3]);
                        break;
                }
                removeLineError(tokens);
                semanticAnalysis = [];
                semanticTime = false;
                stack = ["$", "<programa>"];
                errorCount++;

            }
        

        }
        
//        await delay(500);
    }        
}

function semanticErrorPrint(string, line, column){
    console.log("--- ERRO SEMÂNTICO ---");
    console.log("Linha == ", line);
    console.log("Posição == ", column);
    console.log(string);
    console.log();
    
}

function removeLineError(array){
    while(array[0][1] !== ';' && array[0][1] !== '$'){
        array.shift();
    }
    array.shift();
}

function haveVariableinSymbolTable(name, symbolTable, typeVar = null){
        let haveSymbol = false;

        for(let i = 0; i < symbolTable.length; i++){
            if(symbolTable[i].name === name){
                haveSymbol = true;
                if(typeVar !== null){
                    typeVar.setType(symbolTable[i].typeOf());
                }
            }
        }

        return haveSymbol;
}

function semanticProcess(command, tokens, symbolTable){
    
    if(command === "[novaVariavel]"){
        let haveSymbol = haveVariableinSymbolTable(tokens[2][0], symbolTable);

        if(!haveSymbol){
            symbolTable.push(new tableEntry(tokens[2][0], tokens[1][0]));
            return true;
        }
        else{
            semanticErrorPrint("Nome de variável '" + tokens[2][0] + "' já declarado", tokens[2][2], tokens[2][3]); 
            return false;
        }
    }
    else if(command === "[verificaAtribuicao]"){
        
//        console.log(tokens);
//        console.log(symbolTable);
        let wantedType = new type('temp');
        let haveSymbol = haveVariableinSymbolTable(tokens[0][0], symbolTable, wantedType);
//        console.log(haveSymbol);
//        console.log(wantedType);
        if(!haveSymbol){
            semanticErrorPrint("Variável '" + tokens[0][0] + "' não existe", tokens[0][2], tokens[0][3]);
            return false;
        }

        if(wantedType.typeOf() === "_Char_"){
            if(tokens.length > 3){
                semanticErrorPrint("Parâmetros excessivos para declaração de caractere", tokens[0][2], tokens[0][3]);
                return false;
            }
            else if(tokens[2][1] === "id"){
                let attributeType = new type('temp');
                haveSymbol = haveVariableinSymbolTable(tokens[0][0], symbolTable, attributeType);

                if(!haveSymbol){
                    semanticErrorPrint("Variável '" + tokens[2][0] + "' não existe", tokens[2][2], tokens[2][3]);
                    return false;
                }
                else if(attributeType.typeOf() !== "_Char_"){
                    semanticErrorPrint("Variável atribuída '" + tokens[2][0] + "' tem tipo diferente", tokens[2][2], tokens[2][3]);
                    return false;
                }

                return true;
                
            }
            else if(tokens[2][1] !== 'ch'){
                semanticErrorPrint("Atribuição incorreta para '" + tokens[0][0] + "', esperado caractere ou variável tipo _Char_", tokens[2][2], tokens[2][3]);
                return false;
            }

            return true;

        }
        else if(wantedType.typeOf() === "_Integer_"){
            
            let variableTest = enlistPameterTypesForInteger(tokens, symbolTable);
            if(variableTest !== 0){
                return false;
            }

            return true;

        }
        else if(wantedType.typeOf() === "_Float_"){
            let variableTest = enlistPameterTypesForFloat(tokens, symbolTable);

            if(variableTest !== 0){
                return false;
            }

            return true;
        }
    }
    else if(command === "[verificaBooleano]"){
        console.log(tokens);
        console.log();
        let subTokens = generateSubBooleans(tokens, symbolTable);
//        console.log(subTokens);
        let errorInComparsion = false;
        for(let i = 0; i < subTokens.length; i++){
            if(!errorInComparsion){
                errorInComparsion = verifyTypeOfRealation(subTokens[i], symbolTable);
                continue;
            }
            verifyTypeOfRealation(subTokens[i], symbolTable);

        }
//        console.log(errorInComparsion);
        return !errorInComparsion;
    }
    
}

function verifyTypeOfRealation(tokens, symbolTable){
//    console.log(tokens); 
    let returnType = new type('temp');
    let firstType = tokens[0][1];
    let error = false;

    if(firstType === 'id'){
        let existsSymbol = haveVariableinSymbolTable(tokens[0][0], symbolTable, returnType);
        if(!existsSymbol){
            semanticErrorPrint("Variável '" + tokens[0][0] + "' não existe", tokens[0][2], tokens[0][3]);
            error = true;
            returnType.setType("_Undefined_");
        }
    }
    else if(firstType === 'ch'){ 
        returnType.setType("_Char_");
    }
    else if(firstType === 'int'){ 
        returnType.setType("_Integer_");
    }
    else{ 
        returnType.setType("_Float_");
    }

//    console.log(returnType);


    for(let i = 2; i < tokens.length; i++){

        if(tokens[i][1] === 'rel'){
            continue;
        }

        if(tokens[i][1] === 'id'){
            let typeForValue = new type('temp');
            let exists = haveVariableinSymbolTable(tokens[i][0], symbolTable, typeForValue);

            if(!exists){
                semanticErrorPrint("Variável '" + tokens[i][0] + "' não existe", tokens[i][2], tokens[i][3]);
                error = true;
                continue;
            } 

            if(returnType.typeOf() === '_Undefined_'){
                continue;
            }

            if(returnType.typeOf() === "_Float_" && typeForValue.typeOf() === "_Char_"){
                semanticErrorPrint("Tipo da variável '" + tokens[i][0] + "' incopatível\nEsperado um valor '_Float_' ou '_Integer_'", tokens[i][2], tokens[i][3]);
                error = true;
            }
            else if(returnType.typeOf() === "_Integer_" && typeForValue.typeOf() === "_Float_"){
                returnType.setType("_Float_");
            }
            else if(returnType.typeOf() === '_Float_' && typeForValue.typeOf() === '_Integer_'){
                continue;
            }
            else if(returnType.typeOf() !== typeForValue.typeOf()){
                semanticErrorPrint("Tipo da variável '" + tokens[i][0] + "' incopatível\nEsperado um valor '" + returnType.typeOf() + "'", tokens[i][2], tokens[i][3]);
                error = true;
            }

        }
        else if(returnType.typeOf() === '_Undefined_'){
            continue;
        }
        else if((returnType.typeOf() === "_Float_" || returnType.typeOf() === "_Integer_") && tokens[i][1] === 'ch'){
//            console.log('aqui');
            semanticErrorPrint("Tipos comparados incopatíveis, esperado '_Float_' ou '_Integer_'", tokens[i][2], tokens[i][3]);
            error = true;
        }
        else if(returnType.typeOf() === "_Integer_" && tokens[i][1] === 'ft'){
            returnType.setType("_Float_");
            continue;
        }
        else if(returnType.typeOf() === "_Float_" && tokens[i][1] === 'int'){
            continue;
        }
        else if(returnType.typeOf() !== (tokens[i][1] === 'int' ? "_Integer_" : tokens[i][1] === 'ch' ? "_Char_" : "_Float_")){          
            semanticErrorPrint("Tipos comparados incopatíveis, esperado '" + returnType.typeOf() + "'", tokens[i][2], tokens[i][3]);
            error = true;
        }
    }

    return error;
}

function generateSubBooleans(tokens) {
    let subTokens = [[]];
    for(let i = tokens.length - 1; i >= 0; i--){
        if(tokens[i][0] !== '$>') tokens.pop();
        else{
            tokens.pop();
            break;
        }
    }
    let k = 0;
    for(let i = 1; i < tokens.length; i++){
        if(tokens[i][1] === 'log'){
            subTokens.push([]);
            k++;
            continue;
        }
        subTokens[k].push(tokens[i]);
        
    }

    return subTokens;
}

function enlistPameterTypesForInteger(tokens, symbolTable){
// Retorno Se:
// 0 = Tudo OK
// 1 = Erro de Tipo
// 2 = Variável não existe
    let wantedType = "_Integer_";
    let tempType = "int";

    let returnType = 0

    for(let i = 2; i < tokens.length; i += 2){
        let typeForValue = new type('temp');
//        console.log(tokens[i][1]);
        if(tokens[i][1] === "id"){
            let exists = haveVariableinSymbolTable(tokens[i][0], symbolTable, typeForValue);

            if(!exists){
                semanticErrorPrint("Variável '" + tokens[i][0] + "' não existe", tokens[i][2], tokens[i][3]);
                returnType = 2;
                continue;
            } 

            if(typeForValue.typeOf() !== wantedType){
                semanticErrorPrint("Tipo da variável '" + tokens[i][0] + "' incopatível\nEsperado um valor '" + wantedType + "'", tokens[i][2], tokens[i][3]);
                returnType = 1;
            }
        }
        else if(tokens[i][1] !== tempType){
            semanticErrorPrint("Imediato atribuído do tipo " + (tokens[i][1] === "ft" ? "'_Float_'" : "'_Char_'") + " inválido, esperado tipo '_Integer_'", tokens[i][2], tokens[i][3]); 
            returnType = 1;
        }

    } 
    return returnType;
}

function enlistPameterTypesForFloat(tokens, symbolTable){
// Retorno Se:
// 0 = Tudo OK
// 1 = Erro de Tipo
// 2 = Variável não existe

    let returnType = 0

    for(let i = 2; i < tokens.length; i += 2){
        let typeForValue = new type('temp');
//        console.log(tokens[i][1]);
        if(tokens[i][1] === "id"){
            let exists = haveVariableinSymbolTable(tokens[i][0], symbolTable, typeForValue);

            if(!exists){
                semanticErrorPrint("Variável '" + tokens[i][0] + "' não existe", tokens[i][2], tokens[i][3]);
                returnType = 2;
                continue;
            } 

            if(typeForValue.typeOf() === "_Char_"){
                semanticErrorPrint("Tipo da variável '" + tokens[i][0] + "' incopatível\nEsperado um valor '_Float_' ou '_Integer_'", tokens[i][2], tokens[i][3]);
                returnType = 1;
            }
        }
        else if(tokens[i][1] === "ch"){
            semanticErrorPrint("Imediato atribuído do tipo " + (tokens[i][1] === "ft" ? "'_Float_'" : "'_Char_'") + " inválido, esperado tipo '_Integer_'", tokens[i][2], tokens[i][3]); 
            returnType = 1;
        }

    } 
    return returnType;

}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sintaticTopDown;
