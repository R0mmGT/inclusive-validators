/**
 * This function validates whether a given string is a valid postal code.
 *
 * A valid postal code must be a 5-character or 7-character sequence, 
 * consisting of letters and digits only.
 *
 * The first digit (the "prefix") in US addresses is a number from 0 to 9;
 *
 * In Canada, the first digit can be any of 1, M, S, L
 *
 * This function does not account for variations such as suffixes (e.g., "APO", 
 * "DPO"), two-letter state or province abbreviations in US and Canadian addresses respectively,
 * zip+4 codes.
 *
 * @param {string} s - The input string to be validated.
 * @return {boolean} True if the input string is a valid postal code, False otherwise.
 */
function validate(s) {
  // Initialize the regular expression pattern
  let pattern = /^[0-9]+$/;  // matches one or more digits
  
  // In US addresses, the first digit must be between 0 and 9
  //pattern = `^{0}[1-9]` + (pattern.source.slice(2));
  
  // In Canada, the first character can also be 'M', 'S' or 'L'
  pattern = '^([MLS][0-9]{3} ?){2}$';  

  return new RegExp(pattern).test(s);
}
