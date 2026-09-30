function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  const trimmed = code.trim();
  if (!trimmed) {
    return false;
  }

  const patterns = [
    // Segmented numeric codes worldwide (e.g., US ZIP+4 '12345-6789', Poland '00-950', Japan '123-4567', Brazil '12345-678', Sweden '123 45')
    // Supports optional 1-3 letter country prefix (e.g., 'LT-01100')
    /^(?:[A-Z]{1,3}[- ]?)?\d{2,5}[- ]\d{2,5}$/i,

    // Continuous numeric codes of 3 to 10 digits (e.g., US '90210', Germany '10115', India '110001', Iceland '101')
    // Supports optional 1-3 letter country prefix (e.g., 'CH-8001', 'LV-1050', 'D-10115')
    /^(?:[A-Z]{1,3}[- ]?)?\d{3,10}$/i,

    // United Kingdom and Crown Dependencies (e.g., 'SW1A 1AA', 'EC1A 1BB', 'W1A 0AX', 'M1 1AE', 'GIR 0AA', 'JE2 3RP', 'IM1 1AF')
    /^[A-Z]{1,2}\d[A-Z\d]?[- ]?\d[A-Z]{2}$/i,

    // British Overseas Territories (e.g., Falkland Islands 'FIQQ 1ZZ', Turks and Caicos 'TKCA 1ZZ')
    /^[A-Z]{4}[- ]?\d[A-Z]{2}$/i,

    // Canada (e.g., 'K1A 0B1')
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z][- ]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,

    // Netherlands (e.g., '1012 AB')
    /^\d{4}[- ]?[A-Z]{2}$/i,

    // Ireland / Eircode (e.g., 'D02 X285', 'D6W 2850')
    /^[A-Z]\d[\dW][- ]?[A-Z\d]{4}$/i,

    // Argentina (e.g., 'C1024CWN')
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta (e.g., 'VLT 1115')
    /^[A-Z]{3}[- ]?\d{2,4}$/i,

    // Brunei and Somalia (e.g., 'BS8811', 'JH 09010')
    /^[A-Z]{2}[- ]?\d{4,5}$/i,

    // Eswatini / Swaziland (e.g., 'H100')
    /^[A-Z]\d{3}$/i,

    // Cayman Islands (e.g., 'KY1-1100')
    /^[A-Z]{2}\d[- ]\d{4}$/i,

    // Bermuda (e.g., 'HM 12', 'CR GE')
    /^[A-Z]{2}[- ]?[A-Z\d]{2}$/i
  ];

  return patterns.some((regex) => regex.test(trimmed));
}
