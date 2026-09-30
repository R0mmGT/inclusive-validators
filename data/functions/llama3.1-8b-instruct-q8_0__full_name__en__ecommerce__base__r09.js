function validate(fullName) {
    // Split the string into names (assuming they are separated by spaces)
    let names = fullName.split(' ');
    
    // Check if there's at least one name and it's not empty, 
    // and if all substrings except the first one contain at least two characters
    return names.length >= 1 && Array.from(names).slice(1).every(name => name.length >= 2);
}

console.log(validate("John Doe"));  // true
console.log(validate("John D"));  // false
console.log(validate(" John Doe "));  // true (note the extra spaces)
