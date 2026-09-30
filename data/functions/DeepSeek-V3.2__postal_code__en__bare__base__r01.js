function validate(postalCode) {
  // Basic format check: 5 digits or 5 digits + hyphen + 4 digits
  const basicPattern = /^\d{5}(-\d{4})?$/;
  
  // Validate format first
  if (!basicPattern.test(postalCode)) {
    return false;
  }
  
  // Extract the 5-digit part for further validation
  const fiveDigitPart = postalCode.split('-')[0];
  
  // Invalid prefixes (USPS restrictions)
  const invalidPrefixes = [
    '00000', '00200', '00300', '00400', '00500', '00600', '00700', '00800', '00900',
    '01000', '01100', '01200', '01300', '01400', '01500', '01600', '01700', '01800', '01900',
    '02000', '02100', '02200', '02300', '02400', '02500', '02600', '02700', '02800', '02900',
    '03000', '03100', '03200', '03300', '03400', '03500', '03600', '03700', '03800', '03900',
    '04000', '04100', '04200', '04300', '04400', '04500', '04600', '04700', '04800', '04900',
    '05000', '05100', '05200', '05300', '05400', '05500', '05600', '05700', '05800', '05900',
    '06000', '06100', '06200', '06300', '06400', '06500', '06600', '06700', '06800', '06900',
    '07000', '07100', '07200', '07300', '07400', '07500', '07600', '07700', '07800', '07900',
    '08000', '08100', '08200', '08300', '08400', '08500', '08600', '08700', '08800', '08900',
    '09000', '09100', '09200', '09300', '09400', '09500', '09600', '09700', '09800', '09900',
    '10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000'
  ];
  
  // Check against invalid prefixes
  if (invalidPrefixes.includes(fiveDigitPart)) {
    return false;
  }
  
  // Additional validation: first digit cannot be 0 for some special cases
  // This is a simplification of actual USPS rules
  if (fiveDigitPart.startsWith('0') && !['005', '006', '007', '008', '009'].includes(fiveDigitPart.substring(0, 3))) {
    // Most 0-starting ZIPs are valid, but we already filtered invalid ones above
  }
  
  // Validate numeric range: 00501-99950 (simplified)
  const zipNum = parseInt(fiveDigitPart, 10);
  if (zipNum < 501 || zipNum > 99950) {
    return false;
  }
  
  return true;
}
