function validate(address) {
    // Check if the address is empty or null
    if (!address || address.length === 0) {
        return false;
    }

    // Use regular expression to check for valid format
    let pattern = /^[#0-9a-zA-Z\s(),\.-]+$/;

    // Return true if the match, else return false
    if (pattern.test(address)) {
        return address.trim() !== '';
    } else {
        return false;
    }
}

console.log(validate("123 Main St"));  // Expected output is true
console.log(validate("   123#Main#St "));  // Expected output is true
console.log(validate(""));
console.log(validate(null));
