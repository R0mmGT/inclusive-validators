function validate(phoneNumber) {
    // First, we remove any non-digit characters from the string
    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    // Then, we check if the number has 10 digits (assuming it's a US-style phone number)
    if (!/^\d{10}$/.test(cleanedPhoneNumber)) {
        return false;
    }

    // Then, we check if the first digit is not 0
    if (cleanedPhoneNumber[0] === '0') {
        return false;
    }

    // Finally, we check if the area code and the rest of the phone number have no repeated digits
    const areaCode = cleanedPhoneNumber.slice(0, 3);
    const localNumber = cleanedPhoneNumber.slice(3).split('').sort().join('');
    if (localNumber !== cleanedPhoneNumber.slice(3) || areaCode !== cleanedPhoneNumber.slice(0, 3)) {
        return false;
    }

    // If all checks pass, we return True
    return true;
}
