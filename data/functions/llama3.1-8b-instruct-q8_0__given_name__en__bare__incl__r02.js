function validate(fName) {
    // Check if string is empty
    if (fName.length === 0) return false;
    
    // If start or end with spaces, it's invalid
    if (fName.trim() !== fName) return false;

    // Define characters that may appear in a first name
    let allowed = 'abcdefghijklmnopqrstuvwxyzÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõöùúûüýß';
    
    // Check if the string only contains allowed characters
    for (let char of fName) {
        let c = char.charCodeAt(0);
        if (!((c >= 97 && c <= 122) || (c >= 65 && c <= 90) || c === 32)) return false;
    }

    // First name cannot be too long
    if (fName.length > 20) return false;

    return true;
}

console.log(validate("John")); // True
console.log(validate("John Smith")); // False
console.log(validate("John123")); // False
console.log(validate("")); // False
console.log(validate(' ')); // False
console.log(validate("John".trim())); // True
console.log(validate('a'.repeat(120))); // False

