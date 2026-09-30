function validate(name) {
    // Trim whitespace and validate length
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
        return false;
    }

    // Check for empty string after trimming
    if (trimmed === "") {
        return false;
    }

    // Split into parts
    const parts = trimmed.split(/\s+/);
    
    // Must have at least first and last name
    if (parts.length < 2) {
        return false;
    }

    // Check each part
    for (let part of parts) {
        // Each part must be at least 2 characters
        if (part.length < 2) {
            return false;
        }
        
        // Must start with uppercase letter
        if (!/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'`-]*$/.test(part)) {
            return false;
        }
        
        // No consecutive special characters
        if (/[`'-]{2,}/.test(part)) {
            return false;
        }
        
        // No digits
        if (/\d/.test(part)) {
            return false;
        }
        
        // No consecutive uppercase letters (except for potential acronyms like "McGregor")
        // Check if there are multiple uppercase letters not at the beginning
        if (part.slice(1).match(/[A-ZÀ-ÖØ-Þ]/)) {
            // Allow "Mc", "Mac", "O'", "De", etc.
            const allowedPatterns = /^(Mc|Mac|O'|De|La|Le|Van|Von|Di|Da|Del|Della|St\.?|Saint)$/i;
            if (!allowedPatterns.test(part)) {
                return false;
            }
        }
    }

    // No special characters except allowed ones (already validated in part regex)
    // No emojis or unusual Unicode
    if (/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u.test(trimmed)) {
        return false;
    }

    // No titles like Mr., Mrs., Dr. etc.
    const titles = /\b(mr|mrs|miss|ms|dr|prof|sir|madam|dame|lord|lady|rev)\.?\s+/i;
    if (titles.test(trimmed)) {
        return false;
    }

    // No honorific suffixes
    const suffixes = /\s+(jr|sr|ii|iii|iv|v|phd|md|dds|esq)\.?$/i;
    if (suffixes.test(trimmed)) {
        return false;
    }

    return true;
}
