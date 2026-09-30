function validate(phone) {
    /**
     * Función que verifica si un string ingresado es un número de teléfono válido.
     *
     * @param {string} phone - El número a verificar.
     * @return {boolean} True si el número es válido, False en caso contrario.
     */
    
    // Primero, eliminamos todos los espacios del string
    phone = phone.replace(/\s/g, "");
    
    // Un número de teléfono válido comienza con 54 y tiene entre 9 y 15 dígitos (inclusivo). 
    if (!(phone.startsWith("54") && (phone.length >= 9) && (phone.length <= 15))) {
        return false;
    }
    
    // Luego, eliminamos los dos primeros caracteres (el "54"). El resultado debe ser válido.
    let trimmed = phone.slice(2);
    
    if (/^[0-9]+$/.test(trimmed)) {
        return true;
    } else {
        return false;
    }
}
