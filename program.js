const regexes = [
    ["Palavra-chave", "key", "_(a-z)+_"],
    ["Identificador", "id", "(A-Z)+"],
    ["Tipo", "tp", "_(A-Z)(a-z)*_"],
    ["Integer", "int", "(0-9)+"],
    ["Float", "ft", "(0-9)+.(0-9)*"],
    ["Char", "ch", "'(a-zA-Z)'"],
    ["Final-Linha", ";", ";"],
    ["Abre Bloco", ">", "$>"],
    ["Fecha Bloco", "<", "$<"],
    ["String", "str", "'(a-zA-Z?!=+-*/)*"],
    ["Aritméticos", "ari", "+-/*"],
    ["declaração", "=", "="],
    ["Lógicos", "log", "::,&&,||,!!"],
    ["Relacional", "rel", "<<,>>"],
  ];
  
  const file = fs.readFileSync("regexes.txt", "utf-8");
  const lines = file.split("\n");
  
  const tokens = [];
  for (const line of lines) {
    const [tokenType, tokenValue] = line.split("|");
    const regex = new RegExp(regexes[tokenType][2]);
    if (regex.test(tokenValue)) {
      tokens.push({
        tokenType,
        tokenValue,
      });
    }
  }
  
  const mappedTokens = tokens.reduce((acc, token) => {
    acc[regexes[token.tokenType][1]] = token.tokenValue;
    return acc;
  }, {});
  
  console.log(mappedTokens);