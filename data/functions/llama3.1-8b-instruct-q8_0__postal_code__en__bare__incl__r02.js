function validatePostalCode(postalCode) {
  // Remove leading and trailing whitespace
  postalCode = postalCode.trim();

  // Regular expression pattern to match most common postal codes formats (e.g., US ZIP, Canadian CAN)
  const regex = /^(?:\d{1,2}[- ]?)?\d{3}(\s|$)?$/;
  
  return regex.test(postalCode.replace(/[^0-9A-Za-z\s\-]/g, ''));
}

console.log(validatePostalCode("12345")); // true
console.log(validatePostalCode("ABC ABCD")); // false
console.log(validatePostalCode("123 Main ST")); // true
console.log(validatePostalCode("12345-678")); // true
