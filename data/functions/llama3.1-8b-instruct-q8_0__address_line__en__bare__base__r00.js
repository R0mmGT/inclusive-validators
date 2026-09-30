function validate(address) {
    // Regular expression to match US postal codes (5 digits)
    let usPostalCodeRegex = /^\d{5}$/;
    
    // Regular expression to match state abbreviations
    let stateAbbrRegex = /^[A-Z]{2}$/;

    // Regular expression for street address patterns
    let streetAddressPatternRegex = /^(?:#|\d )?\s*(?:Rm|Ste)?[\d]+(?: APT [^ ]*)?[\D\s]*?(?:E|W|N|S)\.?[\s\d]+\s*([A-Za-z]\.*[A-Za-z0-9-]*)$/;

    // Check if the address string contains a ZIP code
    if (usPostalCodeRegex.test(address)) {
        // Remove all special characters from the address
        let simplifiedAddress = address.replace(/[^a-zA-Z0-9\s]/g, '');
        
        // Try to match one or two words against state abbreviations at the end of the string
        if (stateAbbrRegex.test(simplifiedAddress.slice(-2)) || stateAbbrRegex.test(simplifiedAddress.slice(-1))) {
            // Remove the last state abbreviation from the address
            simplifiedAddress = simplifiedAddress.replace(/ [A-Z]{2}$| [A-Z]$/);
            
            // If this part matches a valid street address pattern and there's still text after it, return true
            if (streetAddressPatternRegex.test(simplifiedAddress) && simplifiedAddress.length > 3) {
                return true;
            }
        } else {
            // Remove all characters after the last non-space character from the string
            let shortenedAddress = simplifiedAddress.slice(0, simplifiedAddress.lastIndexOf(' '));
            
            // If this part matches a valid street address pattern and there's still text after it, return true
            if (streetAddressPatternRegex.test(shortenedAddress) && shortenedAddress.length > 3) {
                return true;
            }
        }
    }

    return false; // no match
}

console.log(validate("123 W Main St Flushing NY 11355"));
console.log(validate("#1 Broadway, New York"));
console.log(validate("10 APT B Southside Dr NW Washington DC 20005"));
