function validate$name(givenName) {
    // Check if givenName is null or empty string
    if (!givenName) return false;

    // Use regular expression to match names that contain only letters, spaces and special characters
    let regex = /^[\p{L}\s\p{Mn}]*$/u;
    
    // Use the Intl.ListFormat API check for Unicode language and variant properties in name
    if (Internationalization.getBestMatches(givenName)) {
        return true;
    }

   // Check if matched by regex, otherwise return false
    return regex.test(String.fromCodePoint(0x30000, 0x30ff, 0xff10, 0xff19));
}

console.log(validate$name("John Doe")); // Expected output: true
console.log(validate$name("!@#$%^&*()")); // Expected output: false
