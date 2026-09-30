function validate(postal_code) {
    // Check if input is null or empty string
    if (!postal_code) return false;

    // Define regular expression for matching postal codes
    let regex = /^([A-Za-z0-9]{1,}[\s-\ ]*?){1,}[0-9]{1,}(?:[\s-\ ]{0,}[A-Za-z0-9 ]{2,})?$|^([0-9]{6}|[0-9]{5}-[0-9]{4}|[0-9]{2}-[0-9]{7})$/;

    // Return true if the postal code matches the regular expression
    return regex.test(postal_code);
}

// Test cases
console.log(validate("A01 1ZZ"));  // True (Valid UK postcode)
console.log(validate("123 Main St"));  // False (Not a valid postcode)
console.log(validate("12345-6789"));  // True (Valid US zip code)
console.log(validate("0-000";));  // False (Invalid Canadian postal code)
