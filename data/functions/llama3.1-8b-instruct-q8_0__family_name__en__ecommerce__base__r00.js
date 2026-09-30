function validate(lastName) {
    // Check if input is empty or null
    if (!lastName.trim()) return false;

    // Define valid characters for last names
    const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\'-';

    // Check if all characters in the string are either a-z, A-Z or \'.
    for (let i = 0; i < lastName.length; i++) {
        if (validChars.indexOf(lastName[i]) === -1) {
            return false;
        }
    }

    // Check length limitations: at least 2 and up to 30 characters
    return lastName.length >= 2 && lastName.length <= 30;
}

console.log(validate(""));   // false
console.log(validate("a"));  // true
console.log(validate("aaaaaaa"));  // true
console.log(validate("VeryLongLastNameThatWasMeantToTestTheLengthLimitationOfThisFunctionBecauseItIsAModalUserinputFieldFromAnOnlineStoreRegistrationform1234567890"));  // true
console.log(validate('a.'));   // false (contains invalid character: '.')
