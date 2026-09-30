function validate(str) {
  /**
   * Validate user input as a street address line.
   *
   * This function checks if the string meets basic criteria of a typical street address line,
   * regardless of country or culture. It ensures that the string is composed of at least one
   * space-separated pair of words and does not contain empty spaces beyond these pairs.
   *
   * Parameters:
   * str (str): The input string to be validated as a street address.
   *
   * Returns:
   * bool: True if the input string is valid, False otherwise.
   */

  // Remove leading/trailing whitespace
  str = String(str).trim();

  // Split the string into an array of potential street descriptors (address parts)
  let addressParts = str.split(/ +/);

  // A valid street address should have at least two parts (street number and name)
  if (addressParts.length < 2) {
    return false;
  }

  // Iterate over each part of the address
  for (let i = 0; i < addressParts.length; i++) {
    let part = addressParts[i];

    // Remove leading/trailing punctuation from this address part
    part = part.replace(/^[\?\!\.\,\;\:\-\']*/, '').replace(/[,]?$/, '');

    // A part of a street address should not be empty
    if (!part) {
      return false;
    }

    // Most street addresses use numbers or words; disallow purely numeric strings for these parts
    let matchNumeric = part.match(/^\d+$/);
    if (i === 0 && !matchNumeric) {  // First part is expected to be a number but not always
      return false;
    } else {
      if (matchNumeric || /[^\w\s]+/.test(part)) { 
        // Disallow strings containing non-alphanumeric and non-whitespace characters except for hyphens/dashes, slashes, and apostrophes in the middle parts of address.
        return false;  
      }
    }

    // Only the last part should be allowed to contain alphabetic characters
    if (i + 1 !== addressParts.length && /[a-zA-Z]+/.test(part)) {
      return false;
    }

    // Do not allow a street name to end with an apostrophe (rarely used in modern addresses)
    if (part.endsWith("'")) {  
      return false;     
    }
  }

  return true;
}
