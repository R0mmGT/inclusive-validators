function isAlpha(input) {
    if (input.length >= 2 && input.length <= 20) {
        for (let i = 0; i < input.length; i++) {
            let code = input.charCodeAt(i);
            if (!(code >= 65 && code <= 90 || code >= 97 && code <= 122)) {
                return false;
            }
        }
    } else {
        return false;
    }

    let spaces = true;
    for (let i in input) {
        if (input[i] === " ") {
            if (i === 0 || i + 1 < input.length) {
                if ((input.charCodeAt(i + 1) >= 65 && input.charCodeAt(i + 1) <= 90
                  || input.charCodeAt(i + 1) >= 97 && input.charCodeAt(i + 1) <= 122)
                  || (input.charCodeAt(i - 1) >= 65 && input.charCodeAt(i - 1) <= 90
                    || input.charCodeAt(i - 1) >= 97 && input.charCodeAt(i - 1) <= 122)) {
                    spaces = false;
                }
            } else if ((i === 0 && (input.charCodeAt(input.length - 1) >= 65 && 
                  input.charCodeAt(input.length - 1) <= 90 || i-2 < input.length && (input
                       .charCodeAt(i - 2) >= 65 && input.charCodeAt(i - 2) <= 90))
                || i === input.length - 1 && (i === 0 && input.charCodeAt(0) >= 65
                    && input.charCodeAt(0) <= 90
                  || input.charCodeAt(i-1) >= 65 && input.charCodeAt(i-1) <= 90))) {
                        spaces = false;
                }
        } else if (!((input.charCodeAt(i - 1) >= 65 && input.charCodeAt(i - 1) <= 90
                     || input.charCodeAt(i - 1) >= 97 && input.charCodeAt(i - 1) <= 122)
                  || (i - 2 < input.length && (input.charCodeAt(i - 2) >= 65 &&
                    input.charCodeAt(i - 2) <= 90 || input.charCodeAt(i-2) >= 97
                      && input.charCodeAt(i-2) <= 122)))) {
                     spaces = false;
                }
            
        }

    }
    if (!spaces) return false;

    return true;
}

function validate(nombrePila){
    let nombrePila = nombrePila.trim()
    let firstSpaceInd = nombrePila.indexOf(" ");
    
    if (firstSpaceInd === -1 || isAlpha(nombrePila.slice(0,firstSpaceInd))
      && nombrePila.charCodeAt(firstSpaceInd + 1) <=32) {
        return true
    } else {
        return false;
    }
}
