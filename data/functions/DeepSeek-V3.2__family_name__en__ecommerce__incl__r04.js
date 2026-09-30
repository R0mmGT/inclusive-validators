const validate = (lastName) => {
  // Basic type and length checks
  if (typeof lastName !== 'string') return false;
  const trimmed = lastName.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  
  // Allow letters from all Unicode scripts (Latin, Cyrillic, CJK, Arabic, etc.)
  // Also allow common punctuation used in names:
  // - Hyphens/em-dashes for compound names (e.g., Smith-Jones)
  // - Apostrophes (e.g., O'Connor)
  // - Spaces for multi-part names (e.g., De La Cruz)
  // - Periods for abbreviations (e.g., St. John)
  // Allow numbers in some cases (e.g., "Van Der Beek 2nd" is unusual but possible)
  const namePattern = /^[\p{L}\p{M}\s.'-]+$/u;
  
  // Check against pattern
  if (!namePattern.test(trimmed)) return false;
  
  // Additional sanity checks
  // No consecutive special characters
  if (/[.'-]{2,}/.test(trimmed)) return false;
  // Cannot start or end with special characters (except apostrophe in some names like 't)
  if (/^[.'-]|[\s.'-]$/.test(trimmed)) return false;
  // Must contain at least one letter
  if (!/\p{L}/u.test(trimmed)) return false;
  
  return true;
};
