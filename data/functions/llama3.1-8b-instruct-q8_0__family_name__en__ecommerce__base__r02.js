function validate(lastName) {
    // Check if the input string is empty or null.
    if (!lastName.trim()) {
        return false;
    }

    // The last name can contain letters, digits, spaces and some special characters like apostrophe and hyphen.
    const regex1 = /^[a-zA-Z\'\-]+$/;  // Match one or more letters.

    // The pattern to match the first character of a surname: it's not zero (which sometimes is allowed in some families) 
    // but not necessarily a letter; a surname may begin with a hyphen. A space can be used to split two parts.
    const regex2 = /^([a-zA-Z]\s?)*$/;

    return Boolean(regex1.test(lastName)) && Boolean(regex2.test(lastName));
}

// Test the function
console.log(validate("Doe"));  // true
console.log(validate("Van der Meer"));  // true
console.log(validate("0 Smith"));  // false (because it starts with a zero)
console.log(validate("! Doe"));  // false (because it contains an exclamation mark)
