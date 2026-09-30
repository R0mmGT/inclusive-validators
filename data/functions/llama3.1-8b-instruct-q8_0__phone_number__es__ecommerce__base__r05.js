function validate(phoneNumber) {
    if (typeof phoneNumber !== 'string') return false;

    const pattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!pattern.test(phoneNumber)) return false;

    const digitsOnly = phoneNumber.replace(/-/g, '');
    if (!(digitsOnly.length === 10 && /^(\+?1-?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(digitsOnly))) {
        return false;
    }

    return true;
}

console.log(validate('123-456-7890')); // true
console.log(validate('[123]-[456]-[7890]')); // false
