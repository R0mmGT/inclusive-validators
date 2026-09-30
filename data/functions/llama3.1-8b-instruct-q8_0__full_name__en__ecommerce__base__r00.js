function validate(name) {
    // Check if the input string is empty or contains non-alphabetic characters
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return false;
    }

    // Split the name into parts (e.g., "John Peter Doe" -> ["John", "Peter", "Doe"])
    let parts = name.split(/\s+/);

    // A valid full name should have at least 2 parts and at most 10 parts
    if (parts.length < 2 || parts.length > 4) {
        return false;
    }

    // Check that each part of the name starts with a capital letter
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (i === 0 && !/[A-Z]/.test(part)) { 
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(part)) { 
            return false;
        }
    }

    // If all checks pass, the name is valid
    return true;
}
