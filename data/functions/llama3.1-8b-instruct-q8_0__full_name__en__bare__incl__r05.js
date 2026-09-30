function validate(fullName) {
  // If input string is empty or null, return false.
  if (!fullName) return false;

  const parts = fullName.trim().split(' ');
  
  // Check if name has at least two parts (first and last names).
  if (parts.length < 2) return false;
  
  // Split the name into individual parts.
  for (let part of parts) {
    // If a part is empty, return false.
    if (!part) return false;

    // Check if each part matches with one or more alphabets.
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    let containsAlpha = true;
    for (let i = 0; containsAlpha && i < part.length; i++) {
      if (alphabets.indexOf(part[i]) === -1) {
        containsAlpha = false;
      }
    }

    // Return false if any part is not alphanumeric.
    if (!containsAlpha) return false;
  }

  return true;
}

console.log(validate('John Doe'));   // should print: true
console.log(validate('Jane  Doe'));  // should print: false
console.log(validate('Doe John'));   // should print: false
console.log(validate('John'));       // should print: false
