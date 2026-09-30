function validate(name) {
    let result = true;

    // Check for empty string
    if (!name.trim()) {
        result = false;
    }

    // Check for length of name
    if (name.length < 2 || name.length > 50) {
        result = false;
    }

    // Check for alphanumeric characters and spaces
    if (!/^[a-zA-Z ]+$/.test(name)) {
        result = false;
    }

    let nameParts = name.toLowerCase().split(' ');

    // Check the number of parts in the full name
    if (nameParts.length !== 2) {
        result = false;
    }

    // Check each part for length, alphanumeric characters and spaces
    let firstPart = nameParts[0];
    let lastName = nameParts[1];

    if (firstPart.length < 3 || firstName.length > 20 || !/^[a-z]+$/.test(firstPart)) {
        result = false;
    }

    if (lastName.length < 2 || lastName.length > 30 || !/^[a-zA-Z-]+$/.test(lastName)) {
        result = false;
    }

    return result;
}

console.log(validate("John Doe")); // True
console.log(validate("a John b")); // False (too short to count as full name)
console.log(validate("---".join(' '))); // False
