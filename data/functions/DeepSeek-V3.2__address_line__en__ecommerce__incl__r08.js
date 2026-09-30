function validate(address) {
    // Check if input is a non-empty string
    if (typeof address !== 'string' || address.trim().length === 0) {
        return false;
    }
    
    const trimmedAddress = address.trim();
    
    // Basic length validation (reasonable limits for street addresses)
    if (trimmedAddress.length < 3 || trimmedAddress.length > 200) {
        return false;
    }
    
    // Check for minimum meaningful components: at least one letter and one number
    // But be flexible for addresses that might not have numbers
    const hasLetters = /[a-zA-Z\u00C0-\u024F\u0400-\u04FF]/.test(trimmedAddress);
    const hasNumbers = /\d/.test(trimmedAddress);
    
    // Some valid addresses might be just names (e.g., "Main Street") 
    // but should have at least letters
    if (!hasLetters) {
        return false;
    }
    
    // Check for excessive special characters (potential injection/typo)
    const specialCharCount = (trimmedAddress.match(/[!@#$%^&*()_+=<>?;:{}[\]\\|]/g) || []).length;
    if (specialCharCount > 5) {
        return false;
    }
    
    // Check for consecutive unusual characters
    if (/([!@#$%^&*()_+=<>?;:{}[\]\\|])\1{2,}/.test(trimmedAddress)) {
        return false;
    }
    
    // Check for reasonable structure - should contain common address elements
    // This is a flexible check to catch gibberish
    const wordCount = trimmedAddress.split(/\s+/).filter(word => word.length > 1).length;
    if (wordCount < 1) {
        return false;
    }
    
    // Check for minimum character diversity (avoid "aaaaaaa" or "111111")
    const uniqueChars = new Set(trimmedAddress.toLowerCase().replace(/\s+/g, ''));
    if (uniqueChars.size < 3 && trimmedAddress.replace(/\s+/g, '').length > 5) {
        return false;
    }
    
    // Validate character set - allow letters, numbers, spaces, and common punctuation
    // This includes Unicode letters for international support
    const validPattern = /^[\p{L}\p{N}\s\-\.,#'"/°´`\\]+$/u;
    if (!validPattern.test(trimmedAddress)) {
        return false;
    }
    
    // Check for suspicious patterns (like JavaScript code)
    if (/<\s*script|javascript:|on\w+\s*=/.test(trimmedAddress.toLowerCase())) {
        return false;
    }
    
    // Ensure there's at least one alphanumeric character cluster of reasonable length
    const alphanumericClusters = trimmedAddress.match(/[\p{L}\p{N}]{2,}/gu);
    if (!alphanumericClusters || alphanumericClusters.length === 0) {
        return false;
    }
    
    // Allow various address formats by being flexible
    // Accept addresses with different structures from various countries
    
    return true;
}
