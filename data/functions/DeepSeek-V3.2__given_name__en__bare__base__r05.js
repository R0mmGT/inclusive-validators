function validate(name) {
  // Check basic requirements
  if (typeof name !== 'string' || name.length === 0) {
    return false;
  }
  
  const trimmedName = name.trim();
  
  // Length constraints: typically 2-30 characters
  if (trimmedName.length < 2 || trimmedName.length > 30) {
    return false;
  }
  
  // Should start with an uppercase letter
  if (!/^[A-ZÀ-ÖØ-Þ]/.test(trimmedName)) {
    return false;
  }
  
  // Allow letters, hyphens, apostrophes, spaces, and some accented characters
  // Names can contain letters, hyphens, apostrophes (for names like O'Connor, D'Angelo),
  // and spaces (for names like "Mary Ann" or "Jean Luc")
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(trimmedName)) {
    return false;
  }
  
  // Ensure no consecutive special characters or spaces
  if (/['-]{2,}|\s{2,}/.test(trimmedName)) {
    return false;
  }
  
  // Ensure name doesn't start or end with special characters
  if (/^['-\s]|['-\s]$/.test(trimmedName)) {
    return false;
  }
  
  // Ensure at least one letter exists after optional prefix/special characters
  if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(trimmedName.replace(/['-\s]/g, ''))) {
    return false;
  }
  
  return true;
}
