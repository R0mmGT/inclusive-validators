function validate(address) {
    // A minimum length is required to avoid strings containing just spaces, etc.
    if (address.length < 3) return false;

    // Allow spaces and commas within address lines, but require at least one alphanumeric character.
    let splitAddress = address.split(/[., ]/);
    
    for (let line of splitAddress) {
        if (line.length == 0 || !/[a-zA-Z]/.test(line)) return false;
    }

    // Allow up to two state abbreviations (2 characters long).
    let stateCounts = {};
    for (let line of splitAddress) {
        if (/^[A-Z]{1,3}$/.test(line)) stateCounts[line] = (stateCounts[line] || 0) + 1;
    }
    // If more than two states are detected or at least one is more than twice, the address is invalid.
    for (let state in stateCounts) {
        if (stateCounts[state] > 2) return false;
    }

    return true;
}
