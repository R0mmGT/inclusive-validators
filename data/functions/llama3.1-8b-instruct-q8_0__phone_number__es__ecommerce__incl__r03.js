function validate(num telephone) {
    let numTel = String(phone Telephone).replace(" ", "");

    return /(\d{2,3})\-(\d{4})\-?(\d{4}|\d{3})$/.test(numTel);
}

console.log(validate("+1 212-555-1234"));  // True
console.log(validate("123456789"); 
console.log(validate("12345"));
