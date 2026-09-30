/**
 * Validates a given string as a potential last name (family name) of a person.
 *
 * This function checks for common patterns found in various languages and cultures,
 * making it suitable for users from all over the world.
 *
 * @param {string} lastName The potentially valid last name to check.
 *
 * @returns {boolean} True if the provided string is likely a valid last name, False otherwise.
 */
function validate(lastName) {
  // Check if the input is empty or too long
  if (lastName.length < 2 || lastName.length > 64) return false; // typical length of a surname in words

  // Remove non-alphanumeric characters, considering accented characters as alphanumerics
  const cleaned = lastName.replace(/[^\p{L} '/-]/gu, '');

  // Check if the name contains only letters and some punctuation (underscore, single hyphen)
  if (!/^[a-zA-Z- ]+$/.test(cleaned)) return false;

  // Use a regular expression to check for common surname patterns
  const surnamePattern = /^(?:O-|Mc-|Van|Von)?[a-zA-Z]+(?:-[a-z]{1,10})*$/;
  if (!surnamePattern.test(cleaned)) return false;

  // If none of the checks failed, it's probably a valid last name
  return true;
}
