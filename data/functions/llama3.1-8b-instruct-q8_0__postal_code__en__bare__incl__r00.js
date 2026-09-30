function validate(postalCode) {
    // Regular expression to match most common postal code formats from around the world.
    let regex = /^[0-9A-Za-z]+[\s0-9A-Za-z]*$/;

    return !regex.test(postalCode);
}

console.log(validate("12345"));  // false
console.log(validate("abcde"));  // false
console.log(validate("12ab3"));  // false
console.log(validate("ABCD1E")); // true
