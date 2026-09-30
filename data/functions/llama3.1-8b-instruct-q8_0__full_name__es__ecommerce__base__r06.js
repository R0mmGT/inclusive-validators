function validate(fullName) {
    let minLen = 2;
    let maxLen = 100;

    if (fullName.length < minLen || fullName.length > maxLen) {
        return false;
    }

    let words = fullName.split(' ');
    
    if (!words.every(word => word.match(/^[a-zA-Z]+$/))) {
        return false;
    }
    
    if (!(1 <= words.length && words.length <= 4)) {
        return false;
    }
    
    let firstName = words[0];
    let lastName = '';
    for (let i = 1; i < words.length; i++) {
        lastName += words[i] + ' ';
    }

    if (!/\w[A-Z]/.test(firstName)) {
        return false;
    } else {
        // Revisa nombres como "Mary Jo"
        // Primero divide el nombre
        let nameArray = fullName.split(' ');
        firstName = '';
        lastName = nameArray[nArray - 1];
        for (let i = 0; i < nArray - 1; i++) {
            firstName += nameArray[i] + ' ';
        }

        // Revisa si todas las subpalabras tienen algún carácter mayúsculo
        if (!firstName || !/^[a-zA-Z]+$/g.test(firstName.replace(' ', ''))) {
            return false;
        } else {
            lastName = fullName.split(' ')[nArray - 1];
            if (!(lastName && /^[A-Za-z]+$/.test(lastName))) {
                return false;
            }
        }
    }

    return true;
}
