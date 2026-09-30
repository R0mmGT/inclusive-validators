function validate(phoneNumber) {
    // Check if the string contains both digits and has the correct length
    if (!/^\d+$/.test(phoneNumber) || phoneNumber.length !== 10) {
        return false;
    }

    // First digit can be either '7' or '8'
    if (phoneNumber[0] !== '7' && phoneNumber[0] !== '8') {
        return false;
    }
    
    // Third and sixth digits must be distinct
    if (phoneNumber[2] === phoneNumber[5]) {
        return false;
    }

    // Last digit can be even number from 0 to 9
    if (!(+phoneNumber[9] % 2 === 0)) {
        return false;
    }
    
    return true;
}
