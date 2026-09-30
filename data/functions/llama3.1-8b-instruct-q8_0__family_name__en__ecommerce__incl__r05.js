function validate(lastName) {
  /**
   * Validate if a string is a valid last name.
   *
   * Args:
   *     lastName (str): The input string to be validated as a last name.
   *
   * Returns:
   *     bool: True if the input string is a valid last name, False otherwise.
   */

  // Remove leading and trailing whitespace from the input string
  lastName = lastName.trim();

  // A valid last name should not be empty
  if (lastName.length === 0) {
    return false;
  }

  // Last names can contain alphabets (both uppercase and lowercase), hyphens, apostrophes, and periods
  let validChars = /[a-zA-Z'-\.]/;

  // Check each character in the last name to ensure it's either a valid character or an empty string
  for (let i = 0; i < lastName.length; i++) {
    if (!validChars.test(lastName[i])) {
      return false;
    }
  }

  // If all checks pass, the input is a valid last name
  return true;
}

// Example usage:
console.log(validate('Doe'));  // Output: True
console.log(validate('De-ó'));
console.log(validate(''));
console.log(validate(null));
