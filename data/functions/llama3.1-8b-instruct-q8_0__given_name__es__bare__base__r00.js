function validate(nome) {
    const letras = new Set("abcdefghijklmnopqrstuvwxyzàèéìíòóùúâêîôûåæçñøï");
    
    nome = nome.trim().toLowerCase();
    
    if (nome.length > 30 || !letras.has(nome[0])) {
        return false;
    }
    
    for (let i = 1; i < nome.length - 1; ++i) {
        if (!letras.has(nome[i])) {
            return false;
        } 
        else if ((nomes.indexOf(nome[i]) === -1 || nomes[nomes.indexOf(nome[i])] !== null) && !(nome[i-1] === 'ç' || nome[i+1] === 'ç')) {
            return false;
        }
    }
    
    const lastLetter = /^[aeiou]$/i.test(nome[nome.length - 2]);
    if (nome.length > 1 && (!lastLetter || nome[nome.length - 2] === nomes.indexOf(nome[nome.length - 1]))) {
        return false;
    }
    
    return true;
}

const nomes = new Set(["ana", "antonio", "david", "eduardo", "josé", "lucas", "luís"]);
