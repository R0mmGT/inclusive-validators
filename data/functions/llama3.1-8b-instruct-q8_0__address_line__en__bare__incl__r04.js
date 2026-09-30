function validate(line) {
    // Check if the input is null or undefined
    if (line === null || line === undefined) {
        return false;
    }

    // Remove leading and trailing whitespace
    let trimmedLine = line.trim();

    // If the input string already passes as a valid street address, 
    // we can immediately return true
    if (/^[0-9A-Za-z\s\.,\-]+$/.test(trimmedLine)) {
        return true;
    }

    // Check the length of the string: it cannot be too short (less than 5 characters)
    // or too long (>50).
    if ((trimmedLine.length < 5) || (trimmedLine.length > 50)) {
        return false;
    }

    // Use a regular expression to check for common problems.
    let regex = /^[a-zA-Z0-9\s\.,'-]+,?\s*[0-9\s\:A-Za-z,-\.]*$/;

    if ((line.match(regex) === null || line.match(/^[0-9]*$/) !== null)) {
        return false;
    }

    // Check for consecutive digits.
    if (/\d\d+\d/.test(line)) {
        return false;
    }

    if (!/^\d+ [a-zA-Z\s]+$/i.test(line) && !line.match(regex)) {
        return false;
    } else {
        return true;
    }
}

// Test cases
console.log(validate("123 Main St"));  // Expected output: True
console.log(validate("123456789012"));  // Expected output: False
console.log(validate("abcdef"));      // Expected output: False
console.log(validate(null));           // Expected output: False
console.log(validate(undefined));     // Expected output: False
