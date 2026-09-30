function validate(phoneNumber) {
  // Remove any non-digit characters as they're irrelevant to the phone number itself
  let cleanedPhoneNumber = phoneNumber.replace(/\D+/g, '');

  // Check if the phone number has the format xxxxxxxxxx (10 digits)
  return /^\d{10}$/.test(cleanedPhoneNumber);
}

console.log(validate("(123) 456-7890"));  // true
console.log(validate("+1-800-CALL-ME"));  // false
