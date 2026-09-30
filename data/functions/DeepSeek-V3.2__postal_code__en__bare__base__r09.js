function validate(postalCode) {
  // Trim whitespace from both ends
  const code = postalCode.trim();
  
  // Check length: postal codes should be 5 digits for basic format
  if (code.length !== 5) {
    return false;
  }
  
  // Check that all characters are digits
  for (let i = 0; i < code.length; i++) {
    if (code[i] < '0' || code[i] > '9') {
      return false;
    }
  }
  
  // Additional validation: first digit cannot be 0
  if (code[0] === '0') {
    return false;
  }
  
  return true;
}
