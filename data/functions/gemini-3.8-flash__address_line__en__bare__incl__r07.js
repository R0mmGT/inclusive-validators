function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // A valid address line should be reasonably bounded in length
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // Reject control characters and invisible non-space formatting
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter or number across any script/language (Unicode-aware)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Disallow characters typically never found in valid physical addresses across cultures
  // (e.g., code injection symbols, URL characters, etc.)
  if (/[<>{}[\]^|*$%?=~_]/u.test(trimmed)) {
    return false;
  }

  return true;
}
