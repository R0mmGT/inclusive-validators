function validate(lastName) {
    // We assume that a valid last name consists of alphabetic characters, 
    // hyphens(-), underscore(_), whitespace spaces(), and (optionally) diacritics.
    
    if (!(lastName.match(/^[a-zA-Z-_\s\u00c0-\u017f]+$/) || 
          lastName.match(/^(?:[^A-Za-z]*[A-E][a-e\u00e1-\u00ea\u0103-\u01fa] )*[a-z\u00c0-\u00ea\u0103-\u01bf)$/i) ||
          lastName.match(/^(?:[A-Z][a-e\u00e1-\u00ea\u0103-\u01fa_\s-]*[\._]\s*)*[\w\._]*$/) || 
          lastName.match(/^([ a-zA-Z-_]+)$/)))) {
        return false;
    }

    // Names in some languages (like Japanese or Korean) use characters that could be considered "special".  
    // Hence, names might contain characters other than A-Za-z_-
    // We allow names with those special characters:
    if ("áàãâäéèêëíìïóôõöúùûüÁÀÃÂÄÉÈÊËÍÌÏÓÔÕÖÚÙÛÜ"
        .split("").some(char => lastName.toLowerCase().includes(char))) {
        
        return true;
    }
    
    // Some last names might start with a non-alphabetic character.
    // This is allowed by our criteria, but we need to exclude the case where it starts
    // like a number or any special character other than diacritics and punctuation marks:
    if (/[^\u00c0-\u02af\u037a-\u1dcf\ufe20-\ufe2f]/.test(lastName[0])) {
        return false;
    }
    
    return true;
}
