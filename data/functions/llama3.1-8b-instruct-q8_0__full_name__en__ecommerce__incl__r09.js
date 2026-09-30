function validate(fullName) {
  // Remove any leading or trailing whitespace and make uppercase
  const trimmedFullNames = [...fullName.toUpperCase()].map(c => 'A' <= c && c <= 'Z' ? c : '');
    
  // Replace multiple whitespaces with a single space
  let modifiedFullNames = trimmedFullNames.join('');
  while (/ +/.test(modifiedFullNames)) {
    modifiedFullNames = modifiedFullNames.replace(/ +/, ' ');
  }
  
  if (modifiedFullNames && /[A-Z]/g.test(modifiedFullNames) &&
      /\s([.?!])\s/.test(modifiedFullNames) && !/\s[A-Z].*/.test(modifiedFullNames)) {
    return true;
  } else {
    return false;
  }
}

// Test the function
console.log(validate('John Peter Doe')); // Expected output: true
console.log(validate('johnpeterDoe'));   // Expected output: false
console.log(validate('a b; c'));         // Expected output: false
console.log(validate('A.B.C'));          // Expected output: false
