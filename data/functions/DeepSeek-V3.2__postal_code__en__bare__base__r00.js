function validate(postalCode) {
  // Handle non-string inputs
  if (typeof postalCode !== 'string') return false;
  
  // Handle empty strings or whitespace-only strings
  if (postalCode.trim() === '') return false;
  
  const trimmed = postalCode.trim();
  
  // US format: 5 digits, optional dash and 4 digits
  const usPattern = /^\d{5}(-\d{4})?$/;
  
  // Canadian format: A1A 1A1 (alternating letters and digits, space optional)
  const caPattern = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i;
  
  // UK format: Multiple complex patterns, common ones:
  // AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
  const ukPattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  
  // Australian format: 4 digits
  const auPattern = /^\d{4}$/;
  
  // German format: 5 digits
  const dePattern = /^\d{5}$/;
  
  // French format: 5 digits
  const frPattern = /^\d{5}$/;
  
  // Japanese format: 3 digits dash 4 digits
  const jpPattern = /^\d{3}-\d{4}$/;
  
  return usPattern.test(trimmed) ||
         caPattern.test(trimmed) ||
         ukPattern.test(trimmed) ||
         auPattern.test(trimmed) ||
         dePattern.test(trimmed) ||
         frPattern.test(trimmed) ||
         jpPattern.test(trimmed);
}
