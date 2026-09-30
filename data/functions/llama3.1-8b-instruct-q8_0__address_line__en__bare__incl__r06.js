function validate(street) {
    // Check if the input string is too short
    if (street === null || street.length < 2) return false;

    // Check for common street types (e.g., Avenue, Street, Boulevard, etc.)
    let commonStreetTypes = ["avenue", "avenues", "blvd", "st", "dr"];
    if (commonStreetTypes.some(type => street.toLowerCase().includes(type))) {
        return validateAfterType(street);
    }

    // Check for common country-specific address components
    let commonComponents = ["unit", "apt", "apartamento", "appartment", "flats", "flat", "floor", "suite"];
    if (commonComponents.some(component => street.toLowerCase().includes(component))) {
        return validateAfterComponent(street);
    }

    // If none of the above checks apply, consider it a valid street address line
    return true;
}

function validateAfterType(street) {
    let commonWords = ["south", "north", "east", "west"];
    for (let word of commonWords) {
        if (street.toLowerCase().includes(word)) break;
    }
    return /^[a-zA-Z\s]+$/.test(street.replace(/[^a-zA-Z\s]/g, ""));
}

function validateAfterComponent(street) {
    let commonComponents = ["north", "south", "east", "west"];
    for (let component of commonComponents) {
        if (street.toLowerCase().includes(component)) break;
    }
    return /^[0-9a-zA-Z\s]+$/.test(street.replace(/[^0-9a-zA-Z\s]/g, ""));
}

console.log(validate("123 Main St"));  // Expected output: true
console.log(validate("123 Main North Street"));  // Expected output: false
console.log(validate("Unit number 1"));  // Expected output: true
