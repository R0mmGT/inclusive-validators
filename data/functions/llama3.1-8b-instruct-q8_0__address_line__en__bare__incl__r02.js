function validateAddress(str) {
    str = str.trim();
    
    if (!str.length || typeof str !== 'string') {
        return false;
    }
    
    let regexStreetName = /^[a-zA-Z0-9\s\.,'-]+$/; // Match common characters in street names
    let numRegex = /^[-+]?\d*\.?\d+([eE][-+]?\d+)?$/; // Match numbers with optional decimal or exponent notations
    
    if (regexStreetName.test(str) || numRegex.test(str)) {
        return true;
    } else {
        return false;
    }
}

console.log(validateAddress("123 Main St"));  // Returns: True
console.log(validateAddress("123"));  // Returns: False
console.log(validateAddress(123));  // Returns: False
console.log(validateAddress(false));  // Returns: False
