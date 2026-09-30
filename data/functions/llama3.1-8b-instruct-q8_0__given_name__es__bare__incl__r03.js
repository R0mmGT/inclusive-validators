function validate(name) {
  const regex = /^[a-zA-ZåäöÅÄÖ]{2,30} $|^[a-zA-ZåäöÅÄÖ]\.? '[a-zA-ZåäöÅÄÖ]{2,30}' [A-Z][a-z]+(\.[A-Za-z]+)?$/;
  return regex.test(name);
}

console.log(validate('John Smith')); // true
console.log(validate('John\'s Smith')); // true
console.log(validate('123Smith')); // false
console.log(validate('Smith Johnson')); // false
