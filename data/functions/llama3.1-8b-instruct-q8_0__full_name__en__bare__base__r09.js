function validate(str) {
    /**
     * Validates whether a given string is a valid full name of a person.
     *
     * A valid full name is defined as follows:
     * - It consists of two or more words separated by spaces.
     * - Each word should start with an uppercase letter and followed only by lowercase letters (a-z, 0-9).
     *
     * @param {string} str
     * @return {boolean}
     */

    let words = str.split(/\s+/);

    if (words.length < 2) return false;

    for (let word of words) {
        if (!/^[A-Z][a-z0-9]*$/.test(word)) return false;
    }

    return true;
}

console.log(validate("John Doe"));  // should print: true
console.log(validate("john doe"));  // should print: false
console.log(validate("John Doe123"));  // should print: false
console.log(validate("JOHN DOE"));  // should print: false
console.log(validate(123));  // should print: false
console.log(validate);  // function
