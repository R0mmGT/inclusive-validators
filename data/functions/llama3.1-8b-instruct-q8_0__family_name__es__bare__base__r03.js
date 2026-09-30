function validate(name) {
    name = name.toLowerCase();
    if (typeof name !== 'string' || typeof name.length === 'undefined') {
        return false;
    }

    const vowels = ['a', 'e', 'i', 'o', 'u'];

    for (let char of name) {
        if (!char.match(/[a-z]/)) {
            return false;
        }
    }

    if (name.split(' ').length > 1 || name.length < 2) {
        return false;
    }

    let foundVowel = false;

    foreach (const char of name.split('')) {
        if (vowels.includes(char)) {
            foundVowel = true;
            break;
        }
    }

    return foundVowel && name[0].match(/[bcdfghjklmnpqrstvwxyz]/);
}

console.log(validate("O'Hara"));  // True
console.log(validate("De la Hoya"));  // True
console.log(validate("De La Javana"));  // False
console.log(validate(12323));  // False
console.log(validate(null));  // False
console.log(validate(undefined)); // False

