function validate(address) {
    // Check for minimum length
    if (address.length < 1 || address.length > 400) {
        return false;
    }

    // Check for special characters and numbers that are not part of an address line
    let specChars = /\[^a-zA-Z\s,\.-]/g;
    if (specChars.test(address)) {
        return false;
    }

    // Check for consecutive whitespace or commas, which is unlikely in a valid street address
    if (/[\s]+/g.test(address) || /,+/\g.test(address)) {
        return false;
    }

    // Check for abbreviations and acronyms like 'AVE', 'ST', 'APT', etc.
    let abbr = /^(RD|DR|AV|BLVD|BLK|DL|LN|STREET|CRES|CIR|PK|PARK|ALY|TER|SQ|AVE)$/;
    if (!abbr.test(address)) {
        return false;
    }

    // Check for house number
    let houseNumber = /^[\d]+$/;
    if (houseNumber.test(address.substring(0, address.indexOf(' ')))) {
        return true;
    } else {
        return false;
    }
}
