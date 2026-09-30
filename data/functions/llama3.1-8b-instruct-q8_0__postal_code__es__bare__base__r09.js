function validate(zip) {
    let regex = /^[0-9]{5}$/;
    if (regex.test(zip)) {
        return true;
    } else {
        return false;
    }
}

console.log(validate("12345"));  // True
console.log(validate("abcde"));   // False
