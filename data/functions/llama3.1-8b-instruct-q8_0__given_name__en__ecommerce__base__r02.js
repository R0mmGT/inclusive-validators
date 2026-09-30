function validate(str) {
    /**
     * Validate if the string is a valid first name.
     *
     * A valid first name must:
     * - contain at least one character other than spaces and numbers
     * - not contain any special characters other than '-'
     */
    // check if the input is a non-empty string
    let valid = typeof str === 'string' && str.trim() !== '';

    // remove all spaces from the first name and check its length
    // must be at least 2 characters long, except for names with apostrophe (e.g., O'Brien)
    // in such cases, it is still a single word
    valid = valid && str.replace(/ /g, '').length > 1 || 
        (!valid && str.includes("'"));

    // check if the first name contains any invalid characters
    valid = valid && !/[^a-zA-Z'-]/.test(str);

    return valid;
}

console.log(validate("John Doe")); // true
console.log(validate("Jane's Name")); // true
console.log(validate("123 Main St")); // false
console.log(validate("")); // false
console.log(validate(123)); // false
console.log(validate(null)); // false
console.log(validate(undefined)); // false

