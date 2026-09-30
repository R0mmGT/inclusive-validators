function validate(phoneString) {
  // Remove all non-digit characters except leading plus
  const cleaned = phoneString.trim();
  
  // Handle empty or too short strings early
  if (!cleaned || cleaned.length < 2) {
    return false;
  }
  
  // Check for invalid characters (only digits, spaces, parentheses, hyphens, dots, and plus at start)
  const validChars = /^[\d\s\(\)\-\+\.]+$/;
  if (!validChars.test(cleaned)) {
    return false;
  }
  
  // Extract digits and potential leading plus
  const digitsOnly = cleaned.replace(/\D/g, '');
  const hasLeadingPlus = cleaned.startsWith('+');
  
  // Minimum and maximum reasonable lengths for international numbers
  // ITU-T E.164 specifies max 15 digits after country code
  // Minimum: country code (1-3 digits) + local number (at least 4-5 digits)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return false;
  }
  
  // Check for valid country code if international format
  if (hasLeadingPlus) {
    // Country codes are 1-3 digits (according to ITU-T E.164)
    const countryCode = digitsOnly.substring(0, Math.min(3, digitsOnly.length));
    const countryCodeLength = countryCode.length;
    
    // Country code must be 1-3 digits and not start with 0
    if (countryCodeLength < 1 || countryCodeLength > 3 || countryCode.startsWith('0')) {
      return false;
    }
    
    // Validate specific known country codes if you want stricter validation
    // This is optional but can help catch obvious errors
    const commonCountryCodes = [
      '1',    // USA/Canada
      '7',    // Russia/Kazakhstan
      '20',   // Egypt
      '27',   // South Africa
      '30',   // Greece
      '31',   // Netherlands
      '32',   // Belgium
      '33',   // France
      '34',   // Spain
      '36',   // Hungary
      '39',   // Italy
      '40',   // Romania
      '41',   // Switzerland
      '43',   // Austria
      '44',   // UK
      '45',   // Denmark
      '46',   // Sweden
      '47',   // Norway
      '48',   // Poland
      '49',   // Germany
      '51',   // Peru
      '52',   // Mexico
      '53',   // Cuba
      '54',   // Argentina
      '55',   // Brazil
      '56',   // Chile
      '57',   // Colombia
      '58',   // Venezuela
      '60',   // Malaysia
      '61',   // Australia
      '62',   // Indonesia
      '63',   | Philippines
      '64',   // New Zealand
      '65',   // Singapore
      '66',   // Thailand
      '81',   // Japan
      '82',   // South Korea
      '84',   // Vietnam
      '86',   // China
      '90',   // Turkey
      '91',   // India
      '92',   // Pakistan
      '93',   // Afghanistan
      '94',   // Sri Lanka
      '95',   // Myanmar
      '98',   // Iran
      '212',  // Morocco
      '213',  // Algeria
      '216',  // Tunisia
      '218',  // Libya
      '220',  // Gambia
      '221',  // Senegal
      '222',  // Mauritania
      '223',  // Mali
      '224',  // Guinea
      '225',  // Ivory Coast
      '226',  // Burkina Faso
      '227',  // Niger
      '228',  // Togo
      '229',  // Benin
      '230',  // Mauritius
      '231',  // Liberia
      '232',  // Sierra Leone
      '233',  // Ghana
      '234',  // Nigeria
      '235',  // Chad
      '236',  // Central African Republic
      '237',  // Cameroon
      '238',  // Cape Verde
      '239',  // Sao Tome and Principe
      '240',  // Equatorial Guinea
      '241',  // Gabon
      '242',  // Republic of the Congo
      '243',  // Democratic Republic of the Congo
      '244',  // Angola
      '245',  // Guinea-Bissau
      '246',  // British Indian Ocean Territory
      '247',  // Ascension Island
      '248',  // Seychelles
      '249',  // Sudan
      '250',  // Rwanda
      '251',  // Ethiopia
      '252',  // Somalia
      '253',  // Djibouti
      '254',  // Kenya
      '255',  // Tanzania
      '256',  // Uganda
      '257',  // Burundi
      '258',  | Mozambique
      '260',  // Zambia
      '261',  // Madagascar
      '262',  // Réunion/Mayotte
      '263',  // Zimbabwe
      '264',  // Namibia
      '265',  // Malawi
      '266',  // Lesotho
      '267',  // Botswana
      '268',  // Eswatini
      '269',  // Comoros
      '290',  // Saint Helena/Tristan da Cunha
      '291',  // Eritrea
      '297',  // Aruba
      '298',  // Faroe Islands
      '299',  // Greenland
      '350',  // Gibraltar
      '351',  // Portugal
      '352',  // Luxembourg
      '353',  // Ireland
      '354',  // Iceland
      '355',  // Albania
      '356',  // Malta
      '357',  // Cyprus
      '358',  // Finland
      '359',  // Bulgaria
      '370',  // Lithuania
      '371',  // Latvia
      '372',  // Estonia
      '373',  // Moldova
      '374',  // Armenia
      '375',  // Belarus
      '376',  // Andorra
      '377',  // Monaco
      '378',  // San Marino
      '379',  // Vatican City
      '380',  // Ukraine
      '381',  // Serbia
      '382',  // Montenegro
      '383',  // Kosovo
      '385',  // Croatia
      '386',  // Slovenia
      '387',  // Bosnia and Herzegovina
      '388',  // European Telephony Numbering Space
      '389',  // North Macedonia
      '420',  // Czech Republic
      '421',  // Slovakia
      '422',  // Liechtenstein (formerly)
      '423',  // Liechtenstein
      '500',  // Falkland Islands
      '501',  // Belize
      '502',  // Guatemala
      '503',  // El Salvador
      '504',  // Honduras
      '505',  // Nicaragua
      '506',  // Costa Rica
      '507',  // Panama
      '508',  // Saint Pierre and Miquelon
      '509',  // Haiti
      '590',  // Guadeloupe/Saint Barthélemy/Saint Martin
      '591',  // Bolivia
      '592',  // Guyana
      '593',  // Ecuador
      '594',  // French Guiana
      '595',  // Paraguay
      '596',  // Martinique
      '597',  // Suriname
      '598',  // Uruguay
      '599',  // Curaçao/Caribbean Netherlands
      '670',  // East Timor
      '672',  // Australian External Territories
      '673',  // Brunei
      '674',  // Nauru
      '675',  // Papua New Guinea
      '676',  // Tonga
      '677',  // Solomon Islands
      '678',  // Vanuatu
      '679',  // Fiji
      '680',  // Palau
      '681',  // Wallis and Futuna
      '682',  // Cook Islands
      '683',  // Niue
      '685',  // Samoa
      '686',  // Kiribati
      '687',  // New Caledonia
      '688',  // Tuvalu
      '689',  // French Polynesia
      '690',  // Tokelau
      '691',  // Micronesia
      '692',  // Marshall Islands
      '800',  // International Freephone
      '808',  // International Shared Cost
      '850',  // North Korea
      '852',  // Hong Kong
      '853',  // Macau
      '855',  // Cambodia
      '856',  // Laos
      '870',  // Inmarsat
      '878',  // Universal Personal Telecommunications
      '880',  // Bangladesh
      '881',  // Global Mobile Satellite System
      '882',  // International Networks
      '883',  // International Networks
      '886',  // Taiwan
      '888',  // Telecommunications for Disaster Relief
      '960',  // Maldives
      '961',  // Lebanon
      '962',  // Jordan
      '963',  // Syria
      '964',  // Iraq
      '965',  // Kuwait
      '966',  // Saudi Arabia
      '967',  // Yemen
      '968',  // Oman
      '970',  // Palestine
      '971',  // UAE
      '972',  // Israel
      '973',  // Bahrain
      '974',  // Qatar
      '975',  // Bhutan
      '976',  // Mongolia
      '977',  // Nepal
      '979',  // International Premium Rate
      '992',  // Tajikistan
      '993',  // Turkmenistan
      '994',  // Azerbaijan
      '995',  // Georgia
      '996',  // Kyrgyzstan
      '998'   // Uzbekistan
    ];
    
    // Check if country code is in list of known codes
    const isValidCountryCode = commonCountryCodes.some(code => 
      digitsOnly.startsWith(code)
    );
    
    if (!isValidCountryCode) {
      return false;
    }
  } else {
    // For local numbers (without +), check they don't start with 0 (except maybe trunk prefix)
    // Some countries use leading 0 for local numbers, but this is country-specific
    // We'll be more lenient here for local formats
    if (digitsOnly.startsWith('0') && digitsOnly.length < 10) {
      // Local number with trunk prefix - ensure reasonable length
      return digitsOnly.length >= 9 && digitsOnly.length <= 13;
    }
  }
  
  // Additional sanity checks
  // Check for sequences of same digit (e.g., 1111111)
  const allSameDigit = /^(\d)\1+$/;
  if (allSameDigit.test(digitsOnly)) {
    return false;
  }
  
  // Check for obvious invalid patterns (like all zeros)
  if (digitsOnly.replace(/0/g, '').length === 0) {
    return false;
  }
  
  // Check for sequential numbers (e.g., 1234567)
  let isSequential = true;
  for (let i = 1; i < digitsOnly.length; i++) {
    const current = parseInt(digitsOnly[i], 10);
    const previous = parseInt(digitsOnly[i-1], 10);
    if (current !== (previous + 1) % 10) {
      isSequential = false;
      break;
    }
  }
  if (isSequential && digitsOnly.length > 5) {
    return false;
  }
  
  // Check for repeating patterns (e.g., 121212)
  if (digitsOnly.length >= 6) {
    for (let patternLength = 1; patternLength <= Math.floor(digitsOnly.length / 2); patternLength++) {
      const pattern = digitsOnly.substring(0, patternLength);
      let repeats = true;
      for (let i = patternLength; i < digitsOnly.length; i += patternLength) {
        if (digitsOnly.substring(i, i + patternLength) !== pattern.substring(0, Math.min(patternLength, digitsOnly.length - i))) {
          repeats = false;
          break;
        }
      }
      if (repeats && patternLength <= 3) {
        return false;
      }
    }
  }
  
  return true;
}
