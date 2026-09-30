/**
 * Checks if a given string is a valid last name (family name) of a person.
 *
 * A valid last name is considered to be a string that consists of any number of uppercase and lowercase alphabetic characters, 
 * spaces, hyphens, apostrophes, and periods. It should start with an uppercase letter or not start at all. Special 
 * considerations are made for names that include accents and other non-ASCII characters.
 *
 * @param {string} surname The string to check for validity as a last name
 * @return {boolean} True if the string is a valid last name, false otherwise
 */
function validate(surname) {
    // A regular expression that matches any character of a valid last name
    const pattern = /[a-zA-Z'.-\s]+/g;
    
    // Check if all characters in the surname are matched by the regular expression
    if (surname.replace(/\W/g, '').match(pattern)) {
        return true;  // If the entire string is matched, it's a valid surname
        
    } 
    // Check if the second character of the surname is lowercase and any other character except for the first one is either 
    // uppercase or has Unicode property 'Letter'
    else if (surname.length >= 2 && /[a-z]/.test(surname.charAt(1)) && 
             surname.slice(1).replace(/\W/g, '').match(pattern.replace(/[a-zA-Z]/g, ''))) {
        return false;
        
    } else {
        // If none of the above conditions are met, it's an invalid surname
        return false;
    }
}
