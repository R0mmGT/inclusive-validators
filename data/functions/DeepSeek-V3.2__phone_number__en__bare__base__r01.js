function validate(phone) {
    // Remove all non-digit characters except leading +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Check for international format (starting with +)
    if (cleaned.startsWith('+')) {
        // International format: + followed by 10-15 digits total
        // Total length includes +, so 11-16 characters
        const digitsOnly = cleaned.substring(1);
        return /^\d{10,15}$/.test(digitsOnly);
    }
    
    // Check for US/Canada format with area code
    // Formats: 1234567890, 123-456-7890, 123.456.7890, (123) 456-7890
    const usRegex = /^(\d{10}|(\d{3})[-\s.]?\d{3}[-\s.]?\d{4}|\(\d{3}\)\s?\d{3}[-\s.]?\d{4})$/;
    return usRegex.test(phone.replace(/[^\d()-\s.]/g, ''));
}
