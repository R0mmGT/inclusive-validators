function validate(firstName) {
    if (!firstName.match(/^[a-zA-Z]+$/) || firstName.length < 2 || firstName.length > 20) {
        return false;
    }
    
    let vowels = 'aeiouAEIOU';
    for (let char of firstName) {
        if (vowels.includes(char)) continue;
        if ((char < 'B' || char > 'Z') && (char < 'b' || char > 'z')) return false;
    }

    return true;
}

console.log(validate('John'));  // Expected output: true
console.log(validate('Aabcaecbfedcbgeaehbfcigfaegbfiebgcfaehgiefbgcfiegafbhfagebgfiaegehagfebagihagegbiebaghefb')); // Expected Output: false
