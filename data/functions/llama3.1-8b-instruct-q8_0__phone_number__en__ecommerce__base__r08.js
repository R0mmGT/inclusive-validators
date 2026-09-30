function validate(phoneNumber) {
    /**
     * Validates whether a given string is a valid phone number or not.
     *
     * @param {string} phoneNumber The user-inputted phone number as a string.
     * @return {boolean} True if the input is a valid phone number, False otherwise.
     */

    // Remove any non-digit characters from the input
    let cleanPhoneNumber = '';
    for (let char of phoneNumber) {
        if (!isNaN(char)) {
            cleanPhoneNumber += char;
        }
    }

    // Define the prefix and length combinations that represent a valid phone number
    const prefixesLongAndShort = ['1', '4', '6', '+62'];

    if (phoneNumbers.length === 9 || phoneNumber.length === 13) {

        // If the cleaned-up string is either 8 or 10 digits long, there's more than likely an area code included in it.
        let cleanCode;
        let code = cleanPhoneNumber.slice(0, 3);
        
        if (code.length == 1) {
            cleanCode = '62' + cleanPhoneNumber;
        } else if ((cleanCode = ['1', '4', '6'].includes(code)) || code === '+2') {
            cleanCode = ['1', '4', '6'].includes((cleanCode += cleanPhoneNumber.slice(3)));
        }
        
        let lastFour = cleanPhoneNumber.slice(cleanPhoneNunber.length - 4);
        if (lastFour.length < 4) {
          lastfour = lastNumber.substring(-5);
        }

        // Determine which region code was used based on the first digit
        return prefixesLongAndShort.includes(code) && 
               lastFour.match(/\d{1,4}/) && phoneNumbers.length == 12;
    } else if (phoneLength === 8 || phoneLength === 10) {
        let code = cleanPhoneNumber.slice(0, 3);

        // Remove any area codes from the cleaned-up string
        for (let i = phoneLength - 1; i >= 3; i--) {
            code += cleanPhoneNumber[i];
        }

        return prefixesLongAndShort.includes(code);
    }
}

// Use case to test the function
console.log(validate("62xxxxxxxx")); // Expected output: True
console.log(validate("+6281234567890")); // Expected output: True
console.log(validate("08 12345 6789")); // Expected output: False
console.log(validate("(012) 345-6789")) // Expected output: False
