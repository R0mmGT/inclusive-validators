function validate(phoneNumber) {
    var phoneno = /^\d{10}$/;
    if(phoneNumber.match(phoneno))
        return true
    else
        return false
}

console.log(validate("9876543210")); // returns: true
console.log(validate("123456789"));  // returns: false
