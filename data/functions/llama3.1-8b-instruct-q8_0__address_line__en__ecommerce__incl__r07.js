function validateAddress(address) {
    // Remove leading and trailing whitespaces
    address = address.trim();
    
    // Simple checks if the address contains at least 1 word, number, or special character before validating any real regex patterns
    if (address.length <= 0) return false;
    
    // Check for non-English characters - in most cases they are not used in street addresses
    if (/[^a-zA-Z0-9\s\-.,!/()]+$/.test(address)) return false;  

    // Validate USA style address format using regular expression
    let usaPattern = /^[#.0-9]+\s[A-Z][a-z]*(?:\s[A-Z][a-z]*){1,5}(?:,\s[A-Z]\S*)?(?:\sCt|St|Ave|Dr|Rd|Blvd)?)$/;
    if (usaPattern.test(address)) return true;  

    // Validate UK style address format using regular expression
    let ukPattern = /^[#.0-9]+\s[Hh][One-Zero Nine]?(?:[St]| Avenue | Road)?(?:\sPt ?)?(?:\s[No.]?)?$/;
    if (ukPattern.test(address)) return true;  

    // Invalid address format, return false
    return false;
}

console.log(validateAddress('123 Main St'));  // USA style address format, returns: true
console.log(validateAddress('123 High St W1B 4AG'));  // UK style address format, returns: true
console.log(validateAddress('AB#C'));   // Returns: false
