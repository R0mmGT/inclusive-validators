function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim() === '') {
        return false;
    }

    const trimmedAddress = address.trim();
    const length = trimmedAddress.length;
    
    // Basic length validation (1-200 characters is reasonable for most addresses)
    if (length < 1 || length > 200) {
        return false;
    }

    // Check for minimum components: should contain both letters and numbers
    // Addresses typically have both (house number + street name)
    // But some addresses might be just descriptive without numbers
    // So we'll be lenient here
    
    // Check for invalid patterns
    const invalidPatterns = [
        // Only numbers
        /^\d+$/,
        // Only special characters (no alphanumeric)
        /^[^\p{L}\p{N}]+$/u,
        // Repeated characters (like "aaaaaaa")
        /^(.)\1{10,}$/,
        // Common placeholder text
        /^(test|example|asdf|qwerty|123abc|abc123)$/i,
        // Excessive spaces (more than 5 consecutive)
        /\s{6,}/
    ];

    for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedAddress)) {
            return false;
        }
    }

    // Check for at least one letter or number (Unicode aware)
    if (!/[\p{L}\p{N}]/u.test(trimmedAddress)) {
        return false;
    }

    // Check for reasonable character mix
    // Count different character types
    const letters = (trimmedAddress.match(/\p{L}/gu) || []).length;
    const numbers = (trimmedAddress.match(/\p{N}/gu) || []).length;
    const spaces = (trimmedAddress.match(/\s/gu) || []).length;
    const otherChars = length - letters - numbers - spaces;

    // Valid addresses typically have reasonable character distribution
    // Allow addresses with just letters (for descriptive addresses like "Main Street")
    // or reasonable mix of characters
    if (letters === 0 && numbers === 0) {
        return false;
    }

    // Check character variety (avoid single repeated character types)
    const uniqueChars = new Set(trimmedAddress.toLowerCase());
    if (uniqueChars.size < 3 && length > 5) {
        return false;
    }

    // Check for reasonable structure
    // At least one space or common address separator
    const hasSeparator = /[\s,\/\\\-]/.test(trimmedAddress);
    
    // For longer addresses (more than 15 chars), require some separation
    if (length > 15 && !hasSeparator) {
        // Allow exceptions for addresses in scripts that don't use spaces
        // Check if it contains non-Latin scripts that might not use spaces
        const nonLatinScript = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(trimmedAddress);
        if (!nonLatinScript) {
            return false;
        }
    }

    // Check for no excessive special characters (more than 30% of string)
    if (otherChars > length * 0.3) {
        return false;
    }

    // Check for no excessive numbers (more than 60% of string)
    if (numbers > length * 0.6 && letters < 2) {
        return false;
    }

    return true;
}
