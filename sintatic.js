
let sintaticTopDown = async function(tokens){
    let stack = [];
    stack.push("$", "<programa>");
    tokens.push(["","$", 0, 0]);
    

    while(true){
        let stackTop = stack[stack.length - 1];
        let tokenFirst = tokens[0][1];
        
        console.log(tokenFirst);
        console.log(stackTop);

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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
                    }
                    break;

                case "<declaracao-tipo>":
                    switch(tokenFirst){
                        case "new":
                            stack.pop();
                            stack.push("id", "tp", "new");
                            break;

                        default:
                            console.log("token Inválido");
                    }
                    break;

                case "<atribuicao>":
                    switch(tokenFirst){
                        case "id":
                            stack.pop();
                            stack.push("<tipo-atribuicao>", "=", "id");
                            break;

                        default:
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
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
                            console.log("token Inválido");
                    }
                    break;

                default:
                    console.log("Erro: não terminal não existe, ou não foi colocado")
            }
        }
        else{ // é um terminal
            if(tokenFirst === stackTop){
                stack.pop();
                tokens.shift();
            }

        }
        
        //console.log(stack);
        //console.log(tokens);
        await delay(500);
    }        
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sintaticTopDown;
