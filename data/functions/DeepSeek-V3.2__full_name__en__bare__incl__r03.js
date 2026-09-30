function validate(name) {
  // Trim whitespace
  name = name.trim();
  
  // Check basic requirements
  if (!name || name.length < 2 || name.length > 100) {
    return false;
  }
  
  // Check for empty or just whitespace
  if (name === "") {
    return false;
  }
  
  // Check for consecutive spaces, dots, or hyphens
  if (/\s{2,}|\.{2,}|-{2,}/.test(name)) {
    return false;
  }
  
  // Split into parts (allowing spaces, hyphens, apostrophes, and dots as separators)
  const parts = name.split(/[\s\-']+/).filter(part => part.length > 0);
  
  // Most cultures have at least 2 name parts (given name + family name)
  // But we need to allow for cultures with single names and multiple middle names
  if (parts.length < 1 || parts.length > 6) {
    return false;
  }
  
  // Check each part
  for (let part of parts) {
    // Allow letters from multiple scripts and certain punctuation
    const validPart = /^[\p{L}\p{M}.'-]+$/u.test(part);
    
    // Check part length (typically 1-30 characters)
    if (!validPart || part.length < 1 || part.length > 30) {
      return false;
    }
    
    // Check for invalid patterns
    if (part.startsWith('-') || part.startsWith('.') || 
        part.endsWith('-') || part.endsWith('.')) {
      return false;
    }
    
    // Check for mixed scripts that might be suspicious
    const scripts = new Set();
    for (let char of part) {
      const script = getScript(char);
      if (script) scripts.add(script);
    }
    
    // Allow up to 2 scripts per part (for names like "José" or "Renée")
    if (scripts.size > 2) {
      return false;
    }
  }
  
  // Basic validation passed
  return true;
}

// Helper function to detect script of a character
function getScript(char) {
  const code = char.charCodeAt(0);
  
  // Latin (with extensions)
  if ((code >= 0x0041 && code <= 0x007A) || 
      (code >= 0x00C0 && code <= 0x02AF)) {
    return 'Latin';
  }
  
  // Cyrillic
  if ((code >= 0x0400 && code <= 0x052F)) {
    return 'Cyrillic';
  }
  
  // Greek
  if ((code >= 0x0370 && code <= 0x03FF)) {
    return 'Greek';
  }
  
  // Armenian
  if ((code >= 0x0530 && code <= 0x058F)) {
    return 'Armenian';
  }
  
  // Hebrew
  if ((code >= 0x0590 && code <= 0x05FF)) {
    return 'Hebrew';
  }
  
  // Arabic
  if ((code >= 0x0600 && code <= 0x06FF) || 
      (code >= 0x0750 && code <= 0x077F) ||
      (code >= 0x08A0 && code <= 0x08FF)) {
    return 'Arabic';
  }
  
  // Devanagari (Hindi, Sanskrit, etc.)
  if ((code >= 0x0900 && code <= 0x097F)) {
    return 'Devanagari';
  }
  
  // Bengali
  if ((code >= 0x0980 && code <= 0x09FF)) {
    return 'Bengali';
  }
  
  // Chinese, Japanese, Korean (CJK)
  if ((code >= 0x4E00 && code <= 0x9FFF) || 
      (code >= 0x3400 && code <= 0x4DBF) ||
      (code >= 0xF900 && code <= 0xFAFF)) {
    return 'CJK';
  }
  
  // Hangul (Korean)
  if ((code >= 0xAC00 && code <= 0xD7AF) || 
      (code >= 0x1100 && code <= 0x11FF) ||
      (code >= 0x3130 && code <= 0x318F)) {
    return 'Hangul';
  }
  
  // Hiragana and Katakana (Japanese)
  if ((code >= 0x3040 && code <= 0x309F) || 
      (code >= 0x30A0 && code <= 0x30FF)) {
    return 'Japanese';
  }
  
  // Thai
  if ((code >= 0x0E00 && code <= 0x0E7F)) {
    return 'Thai';
  }
  
  // Georgian
  if ((code >= 0x10A0 && code <= 0x10FF)) {
    return 'Georgian';
  }
  
  // Tamil
  if ((code >= 0x0B80 && code <= 0x0BFF)) {
    return 'Tamil';
  }
  
  return null;
}
