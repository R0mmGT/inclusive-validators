function validate(phoneNumber) {
  // Handle null, undefined, non-string, or empty input
  if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
    return false;
  }

  const trimmed = phoneNumber.trim();
  
  // Basic pattern to check for invalid characters
  // Allow digits, spaces, hyphens, dots, plus sign, parentheses, and forward slash (for extensions)
  if (!/^[\d\s\-\.\+\(\)\/]+$/.test(trimmed.replace(/\s+/g, '').replace(/^\+/, ''))) {
    return false;
  }

  // Remove all formatting characters except leading plus
  const digitsOnly = trimmed.replace(/[\s\-\.\(\)\/]/g, '');
  
  // Must have at least 4 digits (shortest valid phone numbers like emergency services)
  // and maximum 15 digits (ITU-T E.164 maximum including country code)
  if (digitsOnly.length < 4 || digitsOnly.length > 15) {
    return false;
  }

  // Check for valid international format
  if (digitsOnly.startsWith('+')) {
    // International numbers start with + followed by country code (1-3 digits)
    const withoutPlus = digitsOnly.substring(1);
    // Country code must be 1-3 digits
    const countryCode = withoutPlus.match(/^\d{1,3}/);
    if (!countryCode) {
      return false;
    }
    // Remaining digits after country code must be valid
    const subscriberNumber = withoutPlus.substring(countryCode[0].length);
    return subscriberNumber.length >= 3;
  }

  // Check for valid national numbers (without country code)
  // Must not start with 0 (unless it's a special case like international dialing prefix)
  // Allow numbers starting with 0 only if they're part of national dialing
  // but exclude obvious invalid patterns like all zeros
  if (/^0+$/.test(digitsOnly)) {
    return false;
  }

  // Additional validations
  // 1. No more than 2 consecutive identical digits (reduces false positives for invalid patterns)
  if (/(\d)\1{5,}/.test(digitsOnly.replace(/^\+/, ''))) {
    return false;
  }

  // 2. Check for valid area/city code patterns
  // This is a heuristic - in most countries, area codes don't start with 0 or 1
  const nationalNumber = digitsOnly.replace(/^\+?\d{1,3}/, '');
  if (nationalNumber.length > 0 && /^[01]/.test(nationalNumber)) {
    // Some valid numbers might still start with 0 or 1, so we'll be lenient here
    // but check for obviously invalid patterns like '1111111'
    if (/^[01]+$/.test(nationalNumber)) {
      return false;
    }
  }

  // 3. Extension handling (numbers with /)
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length > 2) {
      return false;
    }
    // Validate the main number part
    const mainPart = parts[0].trim();
    const extension = parts[1].trim();
    if (!mainPart || !extension || !/^\d+$/.test(extension)) {
      return false;
    }
    // Recursively validate the main part without the extension
    return validate(mainPart);
  }

  return true;
}
