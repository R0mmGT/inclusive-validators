function validateStreetAddress(line) {
    // If street address is empty, it is invalid
    if (!line || line.trim() === '') return false;
    
    // Streets often have numbers (but not always)
    let hasNumber = /\d/.test(line);
    let numbersOnly = /^\d+$/.test(line);

    // Streets contain alphanumeric characters 
    // along with some special chars like .,-,+,' etc.
    let correctSpecialChars = new Set('.,+-\' ').has(line[line.length - 1]);
    
    // Street contains maximum one number and that should be at the start
    if (numbersOnly && line.length > 2) return false;
    
    // If input matches any of above conditions then it is a valid street address 
    if (hasNumber || correctSpecialChars) {
        let firstChar = line[0];
        if (firstChar === ' ') return false;

        for (let i=1;i<line.length; i++) {
            let char = line[i];
            if (!isNaN(char)) {
                // If we have already seen a non-number character that doesn't
                // appear in the set of valid special chars, then this must be 
                // inside parentheses to get around this issue:
                return i == 1 || (i > 2 && i<line.length-2 && line[i] === '(') 
                    || line[i-3] === ')' && char === ')';
            }
        }

        // Check if the string ends with any valid special chars
        let lastChar = line[line.length - 1];
        return /\s+/.test(lastChar + '') || correctSpecialChars;
    } else {
        return true; // this was an empty string or a single number
    }
}

console.log(validateStreetAddress('')); // false
console.log(validateStreetAddress('123 Main Street, NY-10001 ')); // true
console.log(validateStreetAddress('NY1-10001')); // false  (only numbers)
console.log(validateStreetAddress(' ABC ' )); // flase (no special chars)
console.log(validateStreetAddress('NY101-0100')); // flase (more than one hyphen in numbers)
