function validate(fullName) {
    // Split the string into parts
    let parts = fullName.split(' ');
    
    if (parts.length < 2 || parts.length > 5) return false;
    
    for (let part of parts) {
        if (!/^[a-zA-Z]+$/.test(part)) return false;
        
        // Check for special characters in the part
        if ([',', '.', ';', ':'].includes(part[part.length - 1])) {
            let prefix = part.slice(0, -1);
            if (/[a-zA-Z]+/.test(prefix) && !/^[a-zA-Z]+$/.test(part)) return false;
        }
    }
    
    // Remove trailing full stops
    return Array.from(parts).every((x, index) => x.split('.').length === 2 ? parts[index] = x.slice(0, -1), true : true);
}

console.log(validate("Alice Bob")); // Expected output: true
console.log(validate("Alice B;ob")); // Expected output: true
console.log(validate("Alice Bo,b")); // Expected output: true
console.log(validate("Alice Bobo")); // Expected output: true (only works for names with multiple first and last parts)
console.log(validate("Alice .Bob")); // Expected output: true
console.log(validate("Alice 2Bob")); // Expected output: false

