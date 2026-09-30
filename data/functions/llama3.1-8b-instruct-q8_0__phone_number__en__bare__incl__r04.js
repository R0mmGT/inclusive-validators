function validate.phoneNumber(phoneNumber) {
    /**
     * Validates a given string as a phone number.
     *
     * This function uses regular expressions to match phone numbers from various countries and cultures.
     *
     * @param {string} phoneNumber The phone number to be validated.
     *
     * @returns {boolean} True if the provided string is a valid phone number, false otherwise.
     */

    // Regular expression pattern for phone numbers
    const phoneRegex = /^[\+]?[-._(]*(\d{1,4}[-._)(]*\d{1,2}|\\d{4}[-._)(]*\d{3})?[-._)(]*([0-9A-Z]{1,20}|[0-9]{5})[-._)(]*$/;

    // Replace non-digit characters with empty string
    const digitsOnly = phoneNumber.replace(/[^0-9+]/g, '');

    // Remove any spaces and hyphens for the initial comparison
    if (!digitsOnly.match(phoneRegex)) {
        return false;
    }

    // Check if phone number contains only numbers or valid special characters
    if (digitsOnly.length < 5 || !/^\d$/.test(digitsOnly)) {
        return false;
    }
    
    // Now remove country codes and determine length based on region, validate accordingly:
    for (let i = -10; i <= 12; i++) {
        const newNumber = phoneNumber.replace(/^[+0-9. ()-]*\d{1,20}/, '');
        if (newNumber.replace(/\D/g, '').length === i) {
            return true;
        }
    }

    // If no match found, return false
    return false;
}
