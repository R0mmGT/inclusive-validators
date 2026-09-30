function validate(direccion) {
    if (typeof direccion !== 'string') {
        return false;
    }
    
    const trimmed = direccion.trim();
    
    if (trimmed.length === 0) {
        return false;
    }
    
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\d\.,#°\-]+$/u;
    if (!regex.test(trimmed)) {
        return false;
    }
    
    const hasLetter = /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(trimmed);
    if (!hasLetter) {
        return false;
    }
    
    const consecutiveSpecial = /[\.,#°\-]{2,}/.test(trimmed);
    if (consecutiveSpecial) {
        return false;
    }
    
    const endsWithSpecial = /[\.,#°\-]$/.test(trimmed);
    if (endsWithSpecial) {
        return false;
    }
    
    const minParts = trimmed.split(/\s+/).length >= 2;
    if (!minParts) {
        return false;
    }
    
    return true;
}
