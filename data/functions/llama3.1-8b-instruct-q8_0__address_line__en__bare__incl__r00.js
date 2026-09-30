function validate(streetAddress) {
    // If the input string is empty or null, it's invalid
    if (!streetAddress) return false;

    // Check for non-alphanumeric characters other than hyphen, comma and space
    if (/[^a-zA-Z0-9\s,-]/.test(streetAddress)) {
        return false;
    }

    // If at any point our conditions fail, the address is invalid
    while (/\s{2,}/.test(streetAddress)) {
        streetAddress = streetAddress.replace(/\s+/g, ' ');
    }
    
    let parts = streetAddress.split(',').map(line => line.trim());
    if (parts.length > 5) return false;

    for (let i = 1; i <= Math.floor(parts.length / 2); ++i) {
        if (/^[0-9]+$/.test(parts[i]) && !(i == parts.length && parts.filter(x => x === '').length != parts.length - i)) {
            let number = parseInt(parts[i])
            let houseNumber = parts.slice(0, i).join(' ');
            
            // We should not have numbers
            if (!houseNumber.replace(/\d/g,'').replace(/[^a-zA-Z]/g,'') && number < 100) return false;
        }
    }

    for (let i = parts.length; i >= 1; --i) {
        let streetPart = parts[i].toLowerCase();
        
        // If the part is a punctuation or special character, this address
        // is unlikely to be correct. It's possible but only in some languages
        if (/[^a-zA-Z]+$/.test(streetPart.replace(/[0-9]/g,''))) {
            return false;
        }
    }

    return true;
}

console.log(validate("123 Main St"));  // True
console.log(validate("123 Main Street, New York NY")); // True
console.log(validate(",Main Street, New York NY"));  // True
console.log(validate("123,Main Street , New York NY ));" ));  // False
console.log(validate('A main street'));  // False
