function validate(address) {
    let pattern = /^[#.0-9a-zA-Z\s,-]+$/;
    return pattern.test(address);
}

console.log(validate("123 Main St")); //should print true
console.log(validate(""));// should print false
