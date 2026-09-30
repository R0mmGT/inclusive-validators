function validate(phoneNumber) {
    // Remove non-digit characters
    let cleanPhoneNumber = phoneNumber.replace(/\D+/g, '');
    
    // Check length
    if (cleanPhoneNumber.length < 6 || cleanPhoneNumber.length > 15) return false;
    
    // Validate international format
    for (let i = 0; i < cleanPhoneNumber.length; i++) {
        if (i === 0 && (cleanPhoneNumber[i] !== '7' && cleanPhoneNumber[i] !== '+')) return false;
        if (i > 3 && (cleanPhoneNumber[i] < '1' || cleanPhoneNumber[i] > '9')) return false;
    }
    
    // Validate non-international format
    for (let i = 0; i < cleanNSNumber.length; i++) {
        if ((i === 0 && cleanPhoneNumber[i] !== '1') || (cleanPhoneNumber[i] < '0' || cleanPhoneNumber[i] > '9')) return false;
    }
    
    // Validate number format in the middle of the string
    let numCount = 16 - cleanPhoneNumber.length;  // subtract country code length if present
    for (let i = cleanPhoneNumber.length; i < numCount && cleanPhoneNumber[i-1] >= '0' && cleanPhoneNumber[i-1] <= '9'; i++) {
        return false;
    }
    
    return true;
}
