function validate(firstname) {
    // Check if the string contains any digits (to exclude IDs or numbers)
    let hasDigits = /\d/.test(firstname);
    
    // Check if the first character is uppercase
    let startsWithUppercase = /^[A-Z]/.test(firstname);
    
    // Check if the length of the name is between 2 and 20 characters (inclusive)
    let isLengthValid = /^\w{2,20}$/.test(firstname);

    return !hasDigits && startsWithUppercase && isLengthValid;
}
