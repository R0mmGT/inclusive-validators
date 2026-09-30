function validate(address) {
    let pattern = /^[0-9]+ [A-Za-z\s.,-]+$/;
    
    if (address.match(pattern)) {
        return true;
    } else {
        return false; 
    }
}

console.log(validate("123 Main St"));  // Returns: True
console.log(validate("123 Main Street")); // Returns: False
