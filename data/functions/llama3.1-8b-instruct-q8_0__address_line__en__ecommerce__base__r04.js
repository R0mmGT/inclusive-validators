function validate(str) {
    let pattern = /^[0-9A-Za-z\s,.-]+$/;
    
    if (!str.trim()) {
        return false;
    }
    
    return str.length === 1 || pattern.test(str.replace(/[^a-zA-Z0-9\s]/g, '')) && 
           !/^\s+|\s+$/.test(str) && 
           /\bis|Is|is\b/i.test(str) ? true : false;
}

console.log(validate('')); // false
console.log(validate(123)); // false (string must be passed)
console.log(validate('  ')); // false
console.log(validate('Street 1 Street 2 street 3')); // false
console.log(validate('123 street name.')); // false
console.log(validate('Street name - street Nameis')); // true
console.log(validate('1234567890')); // false (should include letters)
console.log(validate('streetname,street name; streetname-is')); // true
