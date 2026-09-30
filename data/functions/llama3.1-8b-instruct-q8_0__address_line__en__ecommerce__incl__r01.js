function validate(address) {
    // Regular expressions for common address characters (letters, numbers, hyphens)
    let pattern = /^[a-zA-Z0-9\s'-]+$/;

    // Check if the address contains any street direction or building designation words or abbreviations
    let directions = ["N", "S", "E", "W"];
    let designations = ["Blvd", "Bldg", "Rd", "Ave", "Ct", "St"];

    for (let dire of directions) {
        if (!address.toUpperCase().includes(dire)) break;
        else return true;
    }

    for (let design of designations) {
        let re = new RegExp(`\\b${design}\\b`, 'i');
        if (re.test(address)) return true;
    }

    // Check address contains a building number or unit code
    let re = /\d+[\s-]?\d*/;

    // If the street name is too long
    if (!pattern.test(address) || !address.match(/[a-zA-Z]+/) 
        || (re.test(address) && address.split(re.exec(address)[0]).length > 2)) {
        return false;
    } else {
        return true;
    }
};

console.log(validate("123 Main St"));     // Expected output: true
console.log(validate("123 Main Street")); // Expected output: true
console.log(validate("N123E Main St"));   // Expected output: true
console.log(validate("No. 123 Main Street")); // Expected output: true
console.log(validate("One Thousand One Hundred & Twenty-Third Main Blvd."));  // Expected output: true
console.log(validate("#1"));
console.log(validate("@123"));
console.log(validate("123 MainSt"));
console.log(validate("123 Main Street Building A"))
