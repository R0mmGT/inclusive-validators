function validate(street) {
    let result = /^[0-9A-Za-z\s,-]+$/.test(street);
    
    if (result === false && street.length > 0) {
        let firstChar = street.charAt(0).trim();
        result = /[^\s]/.test(firstChar);
    }
    
    return result;
}

// Example usage:
console.log(validate('123 Main St, Anytown USA')); // Should print true
console.log(validate('Invalid Address')); // Should print false
