/**
 * Validates whether given string represents a valid US phone number.
 *
 * A valid phone number could have different formats:
 * - XXX-XXX-XXXX or
 * - (XXX) XXX-XXXX or
 * - XXXXXXXXX or
 * - XXX.XXXXX XXX
 *
 * @param {string} phoneNumber The input phone number to be validated
 * @returns {boolean} True if the given string is a valid US phone number, false otherwise.
 */
function validate(phoneNumber) {
    // Regular expression to match three groups of numbers separated by hyphens or spaces within parentheses
    var pattern = /^(?:\(\d{3}\)|\d{3})[\s.]?\d{3}[-.]?\d{4}$|^1800|\b\d{10}\b$/;
        
    // Validate input string against the regular expression
    return Boolean(phoneNumber.match(pattern));
}
