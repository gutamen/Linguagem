
let sintaticTopDown = function(tokens){
    let stack = [];
    stack.push("$", "<programa>");
    tokens.push(["","$", 0, 0]);
    
    console.log(stack);
    console.log(tokens);
    while(true){
        let stackTop = stack[stack.length - 1];
        let tokenFirst = tokens[0][1];
        
        console.log(tokenFirst);

        if(stackTop.includes("<") && stackTop.includes(">")){ // é um não terminal

            switch(stackTop){
                case "<programa>":
                    switch(tokenFirst){
                                                            

                        default:
                            console.log("token Inválido");
                    }
                break;

                default:
                    console.log("Erro: não terminal não existe, ou não foi colocado")
            }
        }
        else{ // é um terminal
        }

        break;
    }        
}

module.exports = sintaticTopDown;
