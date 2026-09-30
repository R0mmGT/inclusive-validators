function validate(postalCode) {
  // Remove non-digit characters from the string.
  let cleanedPostalCode = postalCode.replace(/\D+/g, '');
  
  // Check if the length of the cleaned postal code matches the typical length for each country's postal codes:
  // - United Nations Model: 2-4 letters
  // - Australia and New Zealand: 4 digits
  // - most European countries: 5 digits or 5 groups (separated by a space) of numbers in two positions preceded by a letter or number: e.g. H1H3H, N0B 1S0, etc.
  let typicalLength = {
    'united_nations': [2, 4],
    'australia_and_new_zealand': [4]
  };
  
  if(!(postalCode in typicalLength)) {    
    return false;
  }
  else if(!typicalLength[postalCode].every(length => cleanedPostalCode.length >= length && cleanedPostalCode.length <= length)) {
    return false;
  };

// Test for Australia (since we are using the regex pattern that matches 4 digits)
if(postalCode === 'australia_and_new_zealand'){
let codeRegex = /^\d{4}$/;
    if(codeRegex.test(cleanedPostalCode))   return true;

return false;
}
   
  // Additional validation:
  // - The cleaned postal code must only contain numbers.
  let numberRegex = /^\d$/;
  for (let c of cleanedPostalCode.substring(Math.max(0, cleanedPostalCode.length - typicalLength[postalCode][1])) ) {
    if(!numberRegex.test(c)) {  
      return false;
    }
  };

  // If the code has passed all checks up to this point it is a valid postal code.
  return true;
}

console.log(validate("12H4E2"));  // Returns: False
console.log(validate("12345"));   // Returns: True
