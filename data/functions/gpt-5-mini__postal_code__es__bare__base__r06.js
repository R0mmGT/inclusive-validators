function validate(cp) {
  if (typeof cp !== 'string') return false;
  cp = cp.trim();
  // Spanish postal codes: 5 digits, first two between 01 and 52
  return /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(cp);
}
