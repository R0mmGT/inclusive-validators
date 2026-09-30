function validate(fullName) {
    let regex = /^([A-Z][a-z]*\s?)+( [A-Z][a-z]*)*$/;
    return !!fullName.match(regex);
}

console.log(validate("John Doe"));  // Returns: true
console.log(validate("Jane"))      // Returns: false
console.log(validate("John"));     // Returns: false
