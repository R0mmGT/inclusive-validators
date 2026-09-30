function validate(lastName) {
    /**
     * This function validates if a given string is a valid last name.
     *
     * A valid last name should contain only alphabetic characters and possibly an apostrophe or hyphen.
     *
     * @param {string} lastName The last name to be validated.
     * @returns {boolean} True if the last name is valid, False otherwise.
     */
    let pattern = /^[a-zA-Z'](-[a-zA-Z])?$/;
    return Boolean(lastName.match(pattern));
}

console.log(validate("Smith"));  // true
console.log(validate('O\'Hara'));  // true
console.log(validate("123"));      // false
console.log(validate("!@#"));       // false
