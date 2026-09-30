function validate(phoneNumber) {
  // Handle null, undefined, or non-string input
  if (typeof phoneNumber !== 'string') return false;
  
  // Remove all whitespace from the string
  const cleaned = phoneNumber.replace(/\s+/g, '');
  
  // Check for empty string after cleaning
  if (cleaned.length === 0) return false;
  
  // Pattern 1: International format with country code + digits
  // Example: +12345678901 or +44 20 7946 0958
  const internationalRegex = /^\+\d{10,15}$/;
  
  // Pattern 2: Standard US/Canada format with area code
  // Example: (123) 456-7890 or 123-456-7890 or 123.456.7890
  const standardRegex = /^(\d{3}[-\s.]?\d{3}[-\s.]?\d{4}|\(\d{3}\)\s?\d{3}[-\s.]?\d{4})$/;
  
  // Pattern 3: Plain 10-digit number
  // Example: 1234567890
  const plainRegex = /^\d{10}$/;
  
  // Pattern 4: Optional leading 1 for US/Canada with area code
  // Example: 1-123-456-7890 or 1 (123) 456-7890
  const usWithOneRegex = /^1\s?(\d{3}[-\s.]?\d{3}[-\s.]?\d{4}|\(\d{3}\)\s?\d{3}[-\s.]?\d{4})$/;
  
  return internationalRegex.test(cleaned) ||
         standardRegex.test(cleaned) ||
         plainRegex.test(cleaned) ||
         usWithOneRegex.test(cleaned);
}
