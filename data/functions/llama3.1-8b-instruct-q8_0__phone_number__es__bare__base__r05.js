function validate(phoneNumber) {
    if (typeof phoneNumber !== 'string') return false;

    let numbers = phoneNumber.replace(/\D+/g, '');

    if (!numbers.length || !/[0-9]+$/.test(numbers)) 
        return false;
        
    if (phoneNumber.startsWith('+')) {
        if (phoneNumber.length <= 4) {
            return false;
        }
        return true;
    }

    if (numberOfDigits(numbers) === 8 && /^\d+$/.test(phoneNumber)) {
        let country = phoneNumber.slice(0, -8);
        let phoneNo = phoneNumber.slice(-8);

        let validCountries = ['27', '33'];
        
        return validCountries.includes(country)
        || phoneNo.match(/^06\d{8}$/) !== null
        || phoneNo.match(/^07\d{8}$/) !== null
        || phoneNo.match(/^09\d{8}$/) !== null;
    }

    if (numberOfDigits(numbers) === 10 && /^\d+$/.test(phoneNumber)) {

        let validNumbers = [new RegExp(`^${phoneNumber.slice(0, 1)}\d{9}$`)];
        
        return validNumbers.some(regExp -> regExp.test(phoneNumber));
    }
    
    return false
}

function numberOfDigits(number) {
    // Esta función devuelve el número de dígitos en un string dado.
    let nonNumericChars = Array.from(number).filter(c => isNaN(parseInt(c)))
    return number.length - nonNumericChars.length;
}
