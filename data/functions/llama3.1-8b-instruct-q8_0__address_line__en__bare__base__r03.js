function validate(address) {
    /**
     * Validate a street address line.
     *
     * @param {string} address - The street address to be validated.
     * @return {boolean} True if the address is valid, False otherwise.
     */
    
    // Check for the presence of numbers
    if (!/\d/.test(address)) {
        return false;
    }
    
    // Check for commas and periods (possible zip/postal code indicators)
    if (/[,\.]/.test(address) && !/\.\s\d/.test(address)) {
        let parts = address.split(',');
        for (let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].trim();
            if (!/\d/.test(parts[i])) {
                return false;
            }
        }
    } else if (/\./.test(address)) {
        let parts = address.split('.');
        for (let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].trim();
            if (!/\d/.test(parts[i])) {
                return false;
            }
        }
    }

    // Check for more than two consecutive spaces
    if (/\b\s{3,}\b/.test(address)) {
        return false;
    }
    
    ///*
    // Special case to address "C", this would be valid and thus we skip it.
    if (/\s?.*\.$/.test(address) || /\s?.*$/.test(address)) {
        let str = "";
        for (let i = 0; i < address.length - 1; i++) {
            str += address[i];
            if (/[A-Za-z]/.test(str) && !/\d/.test(str)) {
                continue;
            } else break;
        }
        return /[A-Za-z0-9\s\.]{2,}/.test(str);
    }
    
    ///
    
    ///*
    // Special case to address ".", this would be invalid (leading dot), so we return False.
    if (/^\.\s/.test(address)) {
        return false;
    }
    /*/
    
    // Check for a valid city or zip code
    let firstSpaceIndex = address.indexOf(' ');
    if (firstSpaceIndex !== -1 && /\D{2,}$/.test(address.slice(firstSpaceIndex + 1))) {
        return false;
    }

    // Additional check: ensure the street number is one of multiple items that could define an address 
    return /\D\s\d+\s\w+/.test(address);
}

console.log(validate("123 Street Name")); // true
console.log(validate(". Street Name"));   // false
console.log(validate(", Street Name"));   // false
console.log(validate("Street Name"));     // false
console.log(validate("123., 456"));       // true
