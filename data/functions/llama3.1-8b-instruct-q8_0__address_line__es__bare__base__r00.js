function validate(streetAddress) {
    if (!streetAddress.trim() || streetAddress.length > 100) {
        return false;
    }
    
    let addressParts = streetAddress.split(" ");
    
    for (let part of addressParts) {
        part = part.toUpperCase();
        if (!(part.match(/^[A-Z0-9]+$/) || part === "APT" || part === "UNIT")) {
            return false;
        }
    }
    
    return true;
}

console.log(validate("123 Main St"));  // True
console.log(validate("123abc Main St"));  // False
console.log(validate("123 Main St abcdefghijklmnopqrstuvwxyz1234567890"));  // False
