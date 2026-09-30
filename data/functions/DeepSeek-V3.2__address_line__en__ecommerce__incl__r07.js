function validate(address) {
    // Handle edge cases
    if (typeof address !== 'string') return false;
    
    const trimmedAddress = address.trim();
    
    // Empty or whitespace-only strings are invalid
    if (trimmedAddress.length === 0) return false;
    
    // Check for minimum reasonable length (at least "1 A")
    if (trimmedAddress.length < 3) return false;
    
    // Check for maximum reasonable length (adjustable, but set to prevent abuse)
    if (trimmedAddress.length > 200) return false;
    
    // Common address patterns that should be present
    // At least one digit (house/building number) or common number words
    const hasNumber = /\d/.test(trimmedAddress) || 
                     /\b(one|two|three|four|five|six|seven|eight|nine|ten|first|second|third)\b/i.test(trimmedAddress);
    
    // At least some alphabetic characters (for street name)
    const hasLetters = /[a-zA-Z\u00C0-\u024F\u0400-\u04FF]/.test(trimmedAddress);
    
    if (!hasNumber || !hasLetters) return false;
    
    // Check for valid characters - allow letters, digits, spaces, and common address symbols
    const validCharacters = /^[a-zA-Z0-9\u00C0-\u024F\u0400-\u04FF\s.,#\-/\\()&'"°]+$/;
    if (!validCharacters.test(trimmedAddress)) return false;
    
    // Check for reasonable structure - not just repeated characters or patterns
    const normalized = trimmedAddress.replace(/\s+/g, ' ');
    
    // Check for consecutive repeating characters (more than 3 times)
    if (/(.)\1{3,}/.test(normalized)) return false;
    
    // Check for excessive special characters
    const specialCharRatio = (normalized.match(/[.,#\-/\\()&'"°]/g) || []).length / normalized.length;
    if (specialCharRatio > 0.3) return false;
    
    // Check for reasonable word count (between 2 and 10 words typically)
    const wordCount = normalized.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 2 || wordCount > 15) return false;
    
    // Check for at least one word with reasonable length (street names)
    const hasReasonableWord = normalized.split(/\s+/).some(word => 
        word.length >= 2 && /[a-zA-Z\u00C0-\u024F\u0400-\u04FF]/.test(word)
    );
    
    if (!hasReasonableWord) return false;
    
    // Check that address doesn't contain only common invalid patterns
    const invalidPatterns = [
        /^test\b/i,
        /^example\b/i,
        /^\d+$/,
        /^[a-z]+$/i,
        /^(?:[a-z]+\s+)*[a-z]+$/i // Only letters and spaces, no numbers
    ];
    
    if (invalidPatterns.some(pattern => pattern.test(trimmedAddress))) return false;
    
    // Basic format check - address should have some variation in character types
    // Count different character types
    const letterCount = (trimmedAddress.match(/[a-zA-Z\u00C0-\u024F\u0400-\u04FF]/g) || []).length;
    const digitCount = (trimmedAddress.match(/\d/g) || []).length;
    const spaceCount = (trimmedAddress.match(/\s/g) || []).length;
    
    // Ensure reasonable mix of characters
    if (letterCount < 3) return false;
    if (digitCount > trimmedAddress.length / 2) return false; // Too many digits
    
    // Check that number doesn't appear only at the very end (unlikely for valid addresses)
    const endsWithNumberOnly = /^\D+\d+$/.test(trimmedAddress.replace(/\s/g, ''));
    if (endsWithNumberOnly && digitCount < 3) return false; // Allow if it's something like "123"
    
    // Check for common address structure patterns from various countries
    const addressPatterns = [
        // International patterns
        /\d+\s+[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+/,  // "123 Main"
        /[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+\s+\d+/,  // "Main 123" (common in some countries)
        /\d+\s*[-/#]\s*\d+/,                          // "123-456" or "123/456"
        /[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+\s+\d+\s*[a-zA-Z\u00C0-\u024F\u0400-\u04FF]?/, // "Main 123A"
        /\d+\s+[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+\s+[a-zA-Z\u00C0-\u024F\u0400-\u04FF]+/, // "123 Main Street"
    ];
    
    // At least one pattern should match
    const matchesPattern = addressPatterns.some(pattern => pattern.test(normalized));
    
    return matchesPattern;
}
