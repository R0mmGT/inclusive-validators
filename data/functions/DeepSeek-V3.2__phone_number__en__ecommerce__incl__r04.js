function validate(phoneString) {
  // Handle null, undefined, or non-string inputs
  if (typeof phoneString !== 'string') return false;
  
  // Trim and remove any invisible unicode characters
  const trimmed = phoneString.trim();
  if (trimmed.length === 0) return false;
  
  // Remove all formatting characters commonly used in phone numbers
  const stripped = trimmed.replace(/[\s\-\.\(\)\+\/]/g, '');
  
  // Check if it's empty after stripping
  if (stripped.length === 0) return false;
  
  // Remove leading zeros that might appear after country code
  // But preserve a single leading zero for countries like Italy
  let normalized = stripped;
  
  // Handle special cases like toll-free numbers or service codes
  // Allow numbers starting with common prefixes (+, 00, 0)
  if (normalized.startsWith('+')) {
    // Remove the + for validation, keep for length check
    const withoutPlus = normalized.substring(1);
    // Country codes: 1-3 digits, total length: min 7, max 15 (ITU-T E.164)
    // E.164 specifies max 15 digits total (excluding +)
    if (!/^\d{1,15}$/.test(withoutPlus)) return false;
    if (withoutPlus.length < 7 || withoutPlus.length > 15) return false;
    // Check country code is valid (1-3 digits)
    const countryCodeMatch = withoutPlus.match(/^\d{1,3}/);
    if (!countryCodeMatch) return false;
    // Remaining digits after country code should be at least 4
    const remainingDigits = withoutPlus.substring(countryCodeMatch[0].length);
    if (remainingDigits.length < 4) return false;
    return true;
  }
  
  // Handle numbers starting with 00 (international format without +)
  if (normalized.startsWith('00')) {
    const withoutDoubleZero = normalized.substring(2);
    if (!/^\d{1,15}$/.test(withoutDoubleZero)) return false;
    if (withoutDoubleZero.length < 7 || withoutDoubleZero.length > 15) return false;
    const countryCodeMatch = withoutDoubleZero.match(/^\d{1,3}/);
    if (!countryCodeMatch) return false;
    const remainingDigits = withoutDoubleZero.substring(countryCodeMatch[0].length);
    if (remainingDigits.length < 4) return false;
    return true;
  }
  
  // Handle local numbers (without country code)
  // Must contain only digits at this point
  if (!/^\d+$/.test(normalized)) return false;
  
  // Length checks for local numbers
  // Minimum 4 digits (short services), maximum 15 (including potential local prefixes)
  if (normalized.length < 4 || normalized.length > 15) return false;
  
  // Check if it looks like a valid national number
  // Should not have too many repeated digits (common in fake/test numbers)
  const repeatedDigitPattern = /(\d)\1{9,}/; // 10 or more of the same digit
  if (repeatedDigitPattern.test(normalized)) return false;
  
  // Check for valid starting digit for local numbers
  // Most countries don't start local numbers with 0 (except when it's part of area code)
  // But we'll be lenient as some countries have special formats
  
  return true;
}
