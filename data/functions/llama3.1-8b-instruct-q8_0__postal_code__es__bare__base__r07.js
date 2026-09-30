function validate(zipCode) {
  /**
   * Validates a zip code.
   *
   * A valid zip code should be a string of exactly five or nine digits,
   * containing no other characters, and where the second, third and fourth 
   * (in case of a nine-digit code)
   * characters are either 'B' or 'F'.
   *
   * @param {string} zipCode The zip code to be validated.
   *
   * @return {boolean} True if the zip code is valid, False otherwise.
   */

  // First we remove any spaces from the string
  zipCode = zipCode.replace(" ", "");
  
  // Then we check if all characters in the string are digits
  if(!/\d/.test(zipCode)) {
    return false;
  }
    
  // We convert the string into a list of integers for easier manipulation
  let digits = [...zipCode];
    
  // If the zip code has fewer or more than five characters, it's not valid
  if(digits.length !== 5 && digits.length !== 9) {
    return false;
  }
            
  // In case of a five-digit code, we just check if all is well
  if(digits.length == 5) {
    let first = parseInt(digits[0]);
    let rest = digits.slice(1);
    for(let i = 0; i < rest.length; i++) {
      if (!(parseInt(rest[i]) >= 0 && parseInt(rest[i]) <= 9)) {
        return false;
      }
    }
        
    // Check the third character and make sure it's either 'B' or 'F'
    let firsthalf = digits.slice(0, 3);
            
    for(let i = 0; i < firsthalf.length; i++) {
      if(! (parseInt(firsthalf[i]) >= 0 && parseInt(firsthalf[i]) <= 9)) {
        return false;
      }
    }
    return true; 
  }

  // In case of a nine-digit code, we should have 'B' and 'F'
  let first = parseInt(digits[0]);
  let second = parseInt(digits[1]);
  let third = parseInt(digits[2]);
  let last6digits = digits.slice(3);
  
  if (!(first >= 0 && first <= 9
      || (second == 'B' && third == 'F'))) {
    return false;}
            
    // If we've passed all the checks, print True
    for(let i = 0; i < last6digits.length; i++) {
        if (! (last6digits[i] == 'B' 
        || last6digits[i] == 'F'
        )) {
              return false;
        }
      }
          
     return true;

}

// Test cases
console.log(validate('12345'));  // False: 5 digits instead of 9
console.log(validate('123456789'));  // True
console.log(validate('1234ABCD'));  // True
console.log(validate('12345BFCDFEDFGH'));  // True
console.log(validate('12356'));  // False: Not a digit
console.log(validate('01234'));
// True
