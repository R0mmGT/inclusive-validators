function validate(str) {
    // Define a list of valid characters
    let validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\\.,\\/()\'\" ';

    // Split the string into words and check each word separately
    let words = str.split(' ');
    for (let word of words) {
        if (!word || !/\w+/.test(word)) {  // \w matches any alphanumeric character or underscore
            return false;
        }
        for (let c of word) {
            if (![...validChars, ' ', ',', '.', '/', '\\', '\'', '\"' , '(' , ')' ].includes(c)) {
                return false;
            }
        }
    }

    // Check the length of each word and the entire string
    for (let word of words) {
        if (word.length < 2 || word.includes(',')) {
            return false;  // Streets can't be too short and commas are not allowed in street names
        } else if (/\d/.test(word) && !/[a-zA-Z]/.test(word)) {
            let digits = 0;
            for (let c of word) {
                if (!isNaN(c)) digits++;
            }
            if (digits < 2) return false;  // Too few numbers in the street name
        }
    }

    if (words.length == 1 && str.charAt(str.length-1) == ',' ) {  
        return false;
    } else if (str.includes("  ")) {
        return false;
    }

    // More strict validation
    let streetNumber = null;
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (/^\d+$/.test(word) && !/^\b\d+\b$/.test(words[i-1])) {  
            streetNumber = [word];  // This line finds the number
        } else if (!isNaN(word[0]) && isNaN(word[word.length - 1])) {
            streetNumber.push(word); 
        }
    }

    let houseType = null;
    let houseNumber = null;

    for (let word of words) {
        if ([...['Suite', 'Suite ', 'APT', 'Lot', 'Block']].some(v => word.toUpperCase().startsWith(v))) {
            if (houseNumber === null) return false;  // Must be attached to a number
            houseType = [word];
        } else if (!/^\d+$/.test(word)) {  
            if ((streetNumber !== null && !/[a-zA-Z]/.test(streetNumber.join(' '))) || 
                (houseNumber === null && word.includes(','))) return false;  // Street names should contain at least a letter
        } else {

            try {
                parseInt(words[words.indexOf(word)]);
            } catch {}

            if (houseNumber !== null && houseNumber.join('').includes(',')) return false;
                
            houseNumber = houseType === null ? [word] : houseNumber;  
            
            streetNumber = null;
            houseType = null;
        }
    }

    // All validations passed
    return words.length > 0;
}
