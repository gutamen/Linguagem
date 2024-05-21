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
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<funcao>":
                    switch(tokenFirst){
                        case "repeater":
                            stack.pop();
                            stack.push("<sera>", "repeater");
                            break;

                        case "if":
                            stack.pop();
                            stack.push("<sera>", "if");
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
            
            if(!semanticProcess(stack[stack.length - 1], semanticAnalysis, symbolTable, errorCount)) errorCount++; 
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
    while(array[0][1] !== ';'){
        array.shift();
    }
    array.shift();
}

function haveVariableinSymbolTable(name, symbolTable, typeVar = null){
        let haveSymbol = false;
        typeVar = new type('ola');
//        console.log(typeVar.typeOf());
        for(let i = 0; i < symbolTable.length; i++){
            if(symbolTable[i].name === name){
                haveSymbol = true;
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
        let wantedType = null;
        var tipo = new type('teste');
        let haveSymbol = haveVariableinSymbolTable(tokens[2][0], symbolTable, tipo);
        console.log(tipo);
        
        haveSymbol = false;

        for(let i = 0; i < symbolTable.length; i++){
            if(symbolTable[i].name === tokens[0][0]){
                haveSymbol = true;
                wantedType = symbolTable[i].type;
            }
        }

        if(!haveSymbol){
            semanticErrorPrint("Variável '" + tokens[0][0] + "' não existe", tokens[0][2], tokens[0][3]);
            return false;
        }

        if(wantedType === "_Char_"){
            if(tokens.length > 3){
                semanticErrorPrint("Parâmetros excessivos para declaração de caractere", tokens[0][2], tokens[0][3]);
                return false;
            }
            else if(tokens[2][1] === "id"){
                haveSymbol = false;
                let attributeType = null;

                for(let i = 0; i < symbolTable.length; i++){
                    if(symbolTable[i].name === tokens[2][0]){
                    haveSymbol = true;
                    attributeType = symbolTable[i].type;
                    }
                }

                if(!haveSymbol){
                    semanticErrorPrint("Variável '" + tokens[2][0] + "' não existe", tokens[2][2], tokens[2][3]);
                    return false;
                }
                else if(attributeType !== "_Char_"){
                    semanticErrorPrint("Variável atribuída '" + tokens[2][0] + "' tem tipo diferente", tokens[2][2], tokens[2][3]);
                    return false;
                }

                return true;
                
            }
            else if(tokens[2][1] !== 'ch'){
                semanticErrorPrint("Atribuição incorreta para '" + tokens[0][0] + "'", tokens[2][2], tokens[2][3]);
                return false;
            }

            return true;

        }
        else if(wantedType === "_Integer_"){
            let checkList = [];
            for(let i = 2; i < tokens.length; i += 2){
                if(tokens[i][1] !== "int" && tokens[i][1] !== "id"){
                    semanticErrorPrint("Tipo de imediato inválido, esperado '_Integer_'", tokens[i][2], tokens[i][3]);
                    return false;
                }
                checkList.push(tokens[i]);
            }

        }
        else if(wantedType === "_Float_"){

        }
    }
    
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sintaticTopDown;
