function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Validate typical address length
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one letter (e.g., street name, PO Box, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow letters, numbers, spaces, and common address symbols (., / - # ' & () º ª)
  const addressRegex = /^[\p{L}\p{N}\s.,#'\/\-&()ºª]+$/u;

  return addressRegex.test(trimmed);
}
