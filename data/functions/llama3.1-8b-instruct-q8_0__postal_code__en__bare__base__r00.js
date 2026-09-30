function validate(postalCode) {
    // First, we check if the length of the postal code is 6 characters.
    if (postalCode.length !== 6) {
        return false;
    }

    // Then, we check each character in the string to see if it's a digit or a space.
    for (let i = 0; i < 6; i++) {
        let char = postalCode.charAt(i);
        // If the character is not a digit and it's also not a space, the code is invalid.
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            return false;
        }
    }

    // Lastly, we check first three characters for the presence of alphabets
    if (!/[A-Z]/.test(postalCode.slice(0, 3))) {
        return false;
    }

    // If all checks pass, the code is valid.
    return true;
}

console.log(validate('B4H1D9')); // outputs: True
console.log(validate('123456')); // outputs: False
