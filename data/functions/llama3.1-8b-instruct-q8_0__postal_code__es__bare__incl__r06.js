function validate(zipCode) {
    if (typeof zipCode !== 'string') {
        return false;
    }

    const zipRegex = /^[0-9]{1,10}$/;

    for (const specialChar of [" ", "-", "."]) {
        if (zipCode.includes(specialChar)) {
            return false;
        }
    }

    for (let i = 1; i < zipCode.length - 2; i++) {
        if (!/^\d$/.test(zipCode[i])) {
            return false;
        }
    }

    return true;
}

console.log(validate("12345"));  // True
console.log(validate("1 2345"));  // False
console.log(validate("1234A"));

for (let i = 0; i < 10; i++) {
    console.log(validate(`${i}`));
}
