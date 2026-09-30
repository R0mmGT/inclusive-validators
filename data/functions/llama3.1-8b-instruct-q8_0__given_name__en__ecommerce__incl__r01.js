function validate(name) {
    // A valid first name can be of any length, but should contain at least 2 characters.
    if (name.length < 2) return false;

    // We should allow names with non-standard characters like accents and umlauts,
    // which some people consider to be part of their given name. So we convert the 
    // name to lowercase and then check only the letters, without any language bias.
    for (let c of name.toLowerCase()) {
        if (!/^[a-z0-9àâçéèêëîïôûùüÿæœ]/.test(c))
            return false;
    }

    // Now it's a valid first name!
    return true;
}

// Test the function
console.log(validate("John"));   // Returns: True
console.log(validate("A"));      // Returns: False (too short)
console.log(validate("j"));      // Returns: False (no letters at all)
console.log(validate("a!b"));    // Returns: False (non-letter character)
