function validate(name) {
    // Check basic requirements
    if (typeof name !== 'string') return false;
    
    const trimmed = name.trim();
    
    // Minimum and maximum length considerations
    // Some cultures have very short names (like "Jo" or "Xi")
    // and some have longer compound names
    if (trimmed.length < 1 || trimmed.length > 100) return false;
    
    // Check for empty string after trimming
    if (trimmed === '') return false;
    
    // Check for harmful patterns
    // Avoid names that are just special characters, numbers, or control characters
    if (/^[\d\s\p{C}\p{Z}\p{P}\p{S}]+$/u.test(trimmed)) return false;
    
    // Allow letters from any script, spaces, hyphens, apostrophes
    // Also allow combining marks (for accents) and specific connector punctuation
    // This includes: Latin, Cyrillic, Greek, Chinese, Japanese, Arabic, Devanagari, etc.
    if (!/^[\p{L}\p{M}\s'\-.]/u.test(trimmed)) return false;
    
    // Ensure there's at least one letter character (not just punctuation/spaces)
    if (!/[\p{L}\p{M}]/u.test(trimmed)) return false;
    
    // Check for invalid sequences
    // No leading/trailing spaces/punctuation (already trimmed, but check internal)
    if (/^[\s'\-.]|[\s'\-.]$/u.test(trimmed)) return false;
    
    // No consecutive special characters (like -- or '' or ..)
    if (/['\-.]{2,}/u.test(trimmed)) return false;
    
    // No mixing of problematic bidirectional characters
    // Avoid potential right-to-left override characters that could be used for spoofing
    const rtlOverrides = /[\u202A-\u202E\u2066-\u2069]/;
    if (rtlOverrides.test(trimmed)) return false;
    
    // No control characters (except maybe some format characters in specific scripts)
    const controlChars = /[\u0000-\u001F\u007F-\u009F]/;
    if (controlChars.test(trimmed)) return false;
    
    // Allow common name patterns
    // Names can start with letters or letters with apostrophes/hyphens in some cultures
    // like O'Reilly or Al-Assad
    const validStart = /^[\p{L}\p{M}']/u;
    if (!validStart.test(trimmed)) return false;
    
    // Check overall pattern: letters, allowed punctuation, and spaces
    const overallPattern = /^[\p{L}\p{M}'\-.\s]+$/u;
    if (!overallPattern.test(trimmed)) return false;
    
    // Ensure reasonable character distribution (not all same character)
    if (/^(.)\1+$/u.test(trimmed)) return false;
    
    return true;
}
