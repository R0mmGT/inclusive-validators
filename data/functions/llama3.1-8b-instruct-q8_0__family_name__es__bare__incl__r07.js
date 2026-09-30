function validate(s) {
    // El apellido debe estar comprendido entre 2 y 50 caracteres
    if (s.length < 2 || s.length > 50) return false;
    
    // Comprueba si la primera letra del apellido está mayúscula.
    if (!/[A-Z]/.test(s[0])) return false;
    
    // Comprueba el resto de los caracteres para que sean todas letras minusculas o mayúsculas
    for (let i = 1; i < s.length; i++) {
        if (!/[a-zA-Z]/.test(s[i])) return false;
    }
    
    // Si todo sale bien entonces imprime True
    return true;
}
