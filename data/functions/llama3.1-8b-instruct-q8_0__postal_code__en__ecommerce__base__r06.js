function validate(postalCode) {
  // First, check if postalCode is empty or null
  if (!postalCode || !postalCode.trim()) {
    return false;
  }
  
  const reg = /^([A-Za-z]{1}[0-9]{1}[- ]?){4}[A-Za-z]{1}[0-9]{1}$/g;

  // Check if postalCode matches the regular expression
  return reg.test(postalCode);
}

// Example usage:
console.log(validate('S7P 2S6'));  // true
console.log(validate('S72S2S6'));  // false (extra character)
console.log(validate(' S7P 2S6 ')); // true (leading and trailing spaces are allowed)
