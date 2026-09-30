function validate(fullName) {
    // Split the string into an array based on any whitespace characters.
    let nameParts = fullName.split(/\s+/);
    
    // A valid full name should have at least one first name and one last name.
    if (nameParts.length < 2) {
        return false;
    }
    
    // Check each part of the name to make sure it only contains letters and non-essential unicode characters.
    for (let i = 0; i < nameParts.length; i++) {
        let part = nameParts[i];
        
        // If a name is longer than what's considered usual, it's invalid.
        if (part.length > 30) {
            return false;
        }
        
        // Unicode character category checker not exactly possible in JS but 'non-essential characters' includes all accented vowels and consonants, umlauts & diacritics
        let essentialChars = [...part];
        for (let char of part) {
            if (!(char.match(/^a-z$/) || char === "'" || char === "-" || (/[àáâäæåðđ]/).test(char) && /[àáâäæåðđ]/.test(part)) 
                || ([èéêëęēėģğığ] + ['ą', 'Ą']).includes(char) && ((/[èsœŠššŝ]/).test(part))) {
                essentialChars.push(char);
            }
        }

        part = ''.join(essentialChars.map(char => char.charCodeAt(0) < 97 ? char.substr(-1,1) : char)).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        
        // A name should not start or end with a comma or any other special character (except an apostrophe used as name separator).
        if ((part.charCodeAt(0) === 44 || part.charCodeAt(0) === 133 || part.charCodeAt(0) === 8216 || part.charCodeAt(0) >=160 && part.charCodeAt(0) < 192) 
            || (part.charCodeAt(part.length - 1) === 44 || part.charCodeAt(part.length - 1) === 133 || part.charCodeAt(part.length - 1) === 8216 || part.charCodeAt(part.length - 1) >= 160 && part.charCodeAt(part.length - 1) < 192)) {
            return false;
        }
        
        // Check if punctuation is used correctly.
        let words = part.replace(/[.,;!?]/g, ' $& ').split(' ');
        for (let word of words) {
            if ((word.length === 0 || !/[a-z]/i.test(word)) && word !== "'" && !(['de','du','von'].includes(part.toLowerCase()) || ['da', 'de','e','di'].includes(word.substring(0,2).toLowerCase()))) {
                return false;
            }
        }

        // If there are any consecutive duplicate characters in the name, return false.
        for (let j = 1; j < part.length; j++) {
            if (part[j].toLowerCase() === part[j - 1].toLowerCase() && part[j] !== part[j - 1]) {
                return false;
            }
        }

        // Unicode name validation fails on certain inputs like 'Hélène', because of character combinations like à or ã, it doesn't happen with Western alphabet. 
        if (i === nameParts.length - 1 && /\u0300-\u036f/.test(part)) {
            continue;
        }
        
        // Check for consecutive identical letters.
        let charMap = {};
        try { 
            charMap[part[j-1]] += 1;  
        } catch (TypeError) {}
        if (Object.values(charMap).some(x => x > 1)) return false;
    }

    // If we pass all the checks, it's a valid full name.
    return true;
}
