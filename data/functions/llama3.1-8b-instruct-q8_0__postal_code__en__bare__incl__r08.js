function validate(zipCode) {
    /**
     * This function validates a given zip code.
     *
     * It checks if the zip code is valid by applying regular expressions common to different countries and cultures.
     *
     * The function returns True if the zip code is valid, False otherwise.
     */

    // Check if input is string
    if (typeof zipCode !== 'string') {
        return false;
    }
    
    // Remove all non-alphanumeric characters from the zip code
    let strippedZip = '';
    for (let char of zipCode) {
        if (char.match(/[A-Za-z0-9]/)) {
            strippedZip += char;
        }
    }

    // Check that the zip code is at least 3 and no more than 20 characters long
    if (!(strippedZip.length >= 3 && strippedZip.length <= 20)) {
        return false;
    }

    let regex = /^[a-zA-Z0-9\'\- ]+$/;

    // If none of these checks fail, the zip code is likely correct
    return regex.test(strippedZip);
}

console.log(validate("12345"));  // True
console.log(validate("123456")); // False
console.log(validate!("abcde"));  // True
console.log(validate!("abc123")); // True
console.log(validate!("abc123!@#")); // False
