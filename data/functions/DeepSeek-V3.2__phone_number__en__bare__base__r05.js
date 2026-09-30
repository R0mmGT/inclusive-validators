function validate(phoneNumber) {
  // Regular expression for valid phone number formats:
  // - Optional +1 or 1 country code
  // - Supports formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
  // - Area code and exchange code must start with 2-9 (North American numbering plan)
  const phonePattern = /^(\+?1\s?)?(\([2-9]\d{2}\)\s?|[2-9]\d{2}[-.\s]?)[2-9]\d{2}[-.\s]?\d{4}$/;
  
  return phonePattern.test(phoneNumber);
}
