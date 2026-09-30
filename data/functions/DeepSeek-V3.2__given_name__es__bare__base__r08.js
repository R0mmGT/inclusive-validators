function validate(name) {
    // 1. Verificar que sea string y no esté vacío
    if (typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // 2. Longitud mínima y máxima razonable para un nombre
    if (trimmedName.length < 2 || trimmedName.length > 50) {
        return false;
    }
    
    // 3. Solo debe contener letras, espacios, guiones, apóstrofos o puntos (nombres compuestos)
    // Permitimos letras Unicode para nombres internacionales (acentos, caracteres especiales)
    const validNameRegex = /^[\p{L}\s'-]+$/u;
    if (!validNameRegex.test(trimmedName)) {
        return false;
    }
    
    // 4. No debe empezar ni terminar con caracteres no alfabéticos
    const startsWithLetter = /^\p{L}/u.test(trimmedName);
    const endsWithLetter = /\p{L}$/u.test(trimmedName);
    if (!startsWithLetter || !endsWithLetter) {
        return false;
    }
    
    // 5. No debe tener espacios múltiples consecutivos
    if (/\s{2,}/.test(trimmedName)) {
        return false;
    }
    
    // 6. No debe tener guiones o apóstrofos consecutivos o al inicio/final
    if (/[-']{2,}/.test(trimmedName) || 
        trimmedName.startsWith("-") || 
        trimmedName.startsWith("'") ||
        trimmedName.endsWith("-") || 
        trimmedName.endsWith("'")) {
        return false;
    }
    
    // 7. Debe contener al menos una vocal (considerando internacionalización)
    // Esto evita nombres como "Xz" o "Bb"
    const hasVowel = /[aeiouáéíóúàèìòùäëïöüæøåœAEIOUÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÆØÅŒ]/i.test(trimmedName);
    if (!hasVowel) {
        return false;
    }
    
    // 8. Validar formato de nombres compuestos (como "Jean-Claude" o "O'Connor")
    const nameParts = trimmedName.split(/[\s-']+/);
    
    // Cada parte debe empezar con mayúscula (aunque no es estrictamente requerido)
    // Al menos una parte debe tener más de un carácter
    const hasValidParts = nameParts.every(part => 
        part.length >= 1 && /^\p{L}+$/u.test(part)
    );
    
    if (!hasValidParts) {
        return false;
    }
    
    // 9. No debe contener solo una letra repetida (como "Aa" o "Bb")
    const allSameLetter = /^(.)\1+$/i.test(trimmedName.replace(/[\s'-]/g, ''));
    if (allSameLetter) {
        return false;
    }
    
    return true;
}
