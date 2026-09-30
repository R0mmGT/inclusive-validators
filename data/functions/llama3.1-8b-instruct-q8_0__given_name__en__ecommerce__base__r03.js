function validate(firstName) {
    let validCharacters = /^[a-zA-Z\s]*$/;
    if (firstName.length < 2 || firstName.length > 20) {
        return false;
    }
    return validCharacters.test(firstName);
}

console.log(validate("John")); // true
console.log(validate("John Smith")); // true
console.log(validate("J#hn Smith")); // false
console.log(validate("JohnSmith")); // false
