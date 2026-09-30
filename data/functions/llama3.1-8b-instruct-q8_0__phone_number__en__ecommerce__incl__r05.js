function validate(phoneNumber) {
  // Check if phoneNumber is a string.
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  // Remove all non-digit characters from the input number.
  const cleanedPhoneNumber = phoneNumber.replace(/\D+/g, '');

  // If the cleaned phone number has less than 3 or more than 15 digits, it's invalid.
  if (cleanedPhoneNumber.length < 3 || cleanedPhoneNumber.length > 15) {
    return false;
  }

  // Check each group of digits to see if they're valid based on their length and order.
  const countries = [
    { code: '86', len: [10, 13], areaCodes: ['1', '2'] },
    { code: '+91', len: [10] },
    { code: '+44', len: [11, 12, 13, 14] }
  ];

  for (const country of countries) {
    if (cleanedPhoneNumber.startsWith(country.code)) {
      const lastNineChars = cleanedPhoneNumber.substring(country.code.length);
      const [singleDigitCheckLen, possibleDoubleCheckLen] = country.len;
      if (
        ![
          ...lastNineChars.substring(0, singleDigitCheckLen).split(''),
          lastNineChars.substring(1, singleDigitCheckLen)
        ].every(d => {
          return d >= '0' && d <= '9';
        })
      ) {
        return false;
      }

      if (possibleDoubleCheckLen) {
        const possibleDoubleChecker = [
          ...lastNineChars
            .substring(0, possibleDoubleCheckLen)
            .split('')
        ];
        possibleDoubleChecker.sort();
        if (
          JSON.stringify([
            ...lastNineChars
              .substring(1, possibleDoubleCheckLen)
              .split('')
          ].sort()) !== JSON.stringify(possibleDoubleChecker)
        ) {
          return false;
        }
      }

      return true;
    }
  }

  // If none of the above conditions are met, return false.
  return false;
}
