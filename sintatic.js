
let sintaticTopDown = async function(tokens){
    let stack = [];
    stack.push("$", "<programa>");
    tokens.push(["","$", 0, 0]);
    let errorCount = 0;

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
                            sintaxErrorPrint("Não faz sentido", tokens[0][2], tokens[0][3]);
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
                            sintaxErrorPrint("Não faz sentido", tokens[0][2], tokens[0][3]);
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
                            removeLineError(tokens);
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<declaracao-tipo>":
                    switch(tokenFirst){
                        case "new":
                            stack.pop();
                            stack.push("id", "tp", "new");
                            break;

                        default:
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
                            removeLineError(tokens);
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<atribuicao>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<tipo-atribuicao>", "=", "id");
                            break;

                        default:
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
                            removeLineError(tokens);
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                case "<multi>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>");
                            break;

                        case "int":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>");
                            break;

                        case "ft":
                            stack.pop();
                            stack.push("<tipo-expressao>", "<termo>");
                            break;

                        default:
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
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
                            console.log("--- ERRO SINTÁTICO ---");
                            console.log("Linha == ", tokens[0][2]);
                            console.log("Posição == ", tokens[0][3]);
                            console.log("Não faz sentido");
                            console.log();
                            removeLineError(tokens);
                            stack = ["$", "<programa>"];
                            errorCount++;
                    }
                    break;

                default:
                    console.log("Erro: não terminal não existe, ou não foi colocado")
            }
        }
        else{ // é um terminal
            if(tokenFirst === stackTop && tokenFirst !== '$'){
                stack.pop();
                tokens.shift();
            }
            else if(tokenFirst === '$' && stackTop === '$'){
                console.log("Código análisado com ", errorCount, " erros");
                break;
            }else{
                console.log("--- ERRO SINTÁTICO ---");
                console.log("Linha == ", tokens[0][2]);
                console.log("Posição == ", tokens[0][3]);
                console.log("Não faz sentido");
                console.log();
                removeLineError(tokens);
                stack = ["$", "<programa>"];
                errorCount++;

            }
        

        }
        
//        await delay(500);
    }        
}

function removeLineError(array){
    while(array[0][1] !== ';'){
        array.shift();
    }
    array.shift();
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sintaticTopDown;
