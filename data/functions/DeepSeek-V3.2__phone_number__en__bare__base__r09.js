function validate(phoneNumber) {
    // Remove all whitespace characters
    phoneNumber = phoneNumber.replace(/\s+/g, '');
    
    // Pattern 1: +12345678901 (11 digits with +)
    const pattern1 = /^\+[1-9]\d{10}$/;
    
    // Pattern 2: 12345678901 (11 digits without +)
    const pattern2 = /^[1-9]\d{10}$/;
    
    // Pattern 3: 123-456-7890 (US format with dashes)
    const pattern3 = /^[2-9]\d{2}-[2-9]\d{2}-\d{4}$/;
    
    // Pattern 4: (123) 456-7890 (US format with parentheses and space)
    const pattern4 = /^\([2-9]\d{2}\)\s?[2-9]\d{2}-\d{4}$/;
    
    // Pattern 5: 123.456.7890 (US format with dots)
    const pattern5 = /^[2-9]\d{2}\.[2-9]\d{2}\.\d{4}$/;
    
    // Pattern 6: 1234567890 (10 digits US format without separators)
    const pattern6 = /^[2-9]\d{9}$/;
    
    // Pattern 7: +1 (123) 456-7890 (US format with country code)
    const pattern7 = /^\+1\s?\([2-9]\d{2}\)\s?[2-9]\d{2}-\d{4}$/;
    
    // Pattern 8: 1 (123) 456-7890 (US format with leading 1)
    const pattern8 = /^1\s?\([2-9]\d{2}\)\s?[2-9]\d{2}-\d{4}$/;
    
    // Pattern 9: +44 20 7123 4567 (UK format example)
    const pattern9 = /^\+[1-9]\d{1,3}\s?\d{2,4}\s?\d{3,4}\s?\d{3,4}$/;
    
    // Pattern 10: 020 7123 4567 (UK format without country code)
    const pattern10 = /^\d{2,4}\s?\d{3,4}\s?\d{3,4}$/;
    
    return pattern1.test(phoneNumber) || 
           pattern2.test(phoneNumber) || 
           pattern3.test(phoneNumber) || 
           pattern4.test(phoneNumber) || 
           pattern5.test(phoneNumber) || 
           pattern6.test(phoneNumber) || 
           pattern7.test(phoneNumber) || 
           pattern8.test(phoneNumber) || 
           pattern9.test(phoneNumber) || 
           pattern10.test(phoneNumber);
}
