function validate(s) {
    // split the string into parts (assuming first part contains first name, rest contain all middle names and last name)
    let sParts = s.split(' ');
    
    // check if there is at most 1 missing part between any two parts (account for one or two spaces before/after the name)
    for (let i = 0; i < sParts.length - 1; i++) {
        let nextIndex = Math.max(i + 2, i + 1);
        
        while (nextIndex <= sParts.length - 1) {
            if (!(Math.abs(nextIndex - (i + 1)) === 1)) {
                return false;
            }
            nextIndex += 2;
        }
    }

    // If no errors are found, return True
    return true;
}

console.log(validate("John Michael")); // Expected output: true
console.log(validate("John Micheal")); // Expected output: true
console.log(validate("John Michaelo")); // Expected output: false
