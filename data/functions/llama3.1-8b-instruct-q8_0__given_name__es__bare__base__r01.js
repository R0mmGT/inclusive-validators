function validate(name) {
    // Define una lista de sílabas comunes para nombres de pila como referencia
    const commonSyllables = ['be', 'ba', 'bi', 'bo', 'bu', 'ce', 'ca', 'ci', 'co', 'cu', 
                            'da', 'de', 'di', 'do', 'du', 'ga', 'ge', 'gi', 'go', 'gu', 
                            'ha', 'he', 'hi', 'ho', 'hu', 'ja', 'je', 'ji', 'jo', 'ju', 
                            'ka', 'ke', 'ki', 'ko', 'ku', 'ma', 'me', 'mi', 'mo', 'mu', 
                            'na', 'ne', 'ni', 'no', 'nu', 'pa', 'pe', 'pi', 'po', 'pu', 
                            'ra', 're', 'ri', 'ro', 'ru', 'sa', 'se', 'shi', 'so', 'su', 
                            'ta', 'te', 'ti', 'to', 'tsu', 'wa', 'ya', 'yo', 'yu', 'ze'];

    // Convierte el nombre a mayúsculas para que sea más fácil trabajar con él.
    const nameUpper = name.toUpperCase();

    // Si el nombre está en blanco, es inválido.
    if (name.trim() === '') {
        return false;
    }

    // Si la longitud del nombre es inferior o igual a 2 caracteres,
    // lo consideramos como un nombre de pila válido.
    if (name.length <= 2) {
        return true;
    }

    // Separa el nombre en palabras para revisarlas por separado
    const words = nameUpper.split(' ');
    
    // Si hay más de una palabra, el nombre es inválido 
    if (words.length > 1) {
        return false;
    }
        
    // Revisa cada caracter del nombre
    for (let c of nameUpper) {
        // Ignora espacios y apóstrofos
        if (![' ', "'"].includes(c)) {
            // Si el carácter no es una vocal ni se ajusta a un silabario común, lo consideramos como inválido.
            if (!(c.match(/[AEIOU]/) || commonSyllables.some(s => c.startsWith(s)))) {
                return false;
            }
        }
    }

    // Hasta aquí todo tiene que haber salido bien, el nombre es válido
    return true;
}
