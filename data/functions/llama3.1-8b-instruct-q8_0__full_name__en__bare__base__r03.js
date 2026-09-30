function validate(fullName) {
    // A valid full name should only contain letters (spaces are allowed)
    return /^[a-zA-Z\s]+$/.test(fullName);
}
