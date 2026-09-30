function validate(nombre) {
    // Verificar que el argumento sea un string
    if (typeof nombre !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y final
    const nombreTrim = nombre.trim();
    
    // Un nombre válido debe:
    // 1. Tener al menos un carácter
    // 2. No contener números
    // 3. No contener símbolos especiales (solo letras, espacios, guiones o apóstrofes comunes en nombres)
    // 4. No contener solo espacios
    // 5. Debe empezar con mayúscula y el resto minúsculas (con posibles excepciones como "Mc", "Mac", guiones o apóstrofes)
    
    if (nombreTrim.length === 0) {
        return false;
    }
    
    // Expresión regular para validar nombres
    // Permite: letras (incluyendo acentos y caracteres internacionales), espacios, guiones, apóstrofes
    // Requiere que empiece con letra mayúscula
    const nombreRegex = /^[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛÑÇ][a-záéíóúàèìòùäëïöüâêîôûñç'\-]*(?:\s+[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛÑÇ][a-záéíóúàèìòùäëïöüâêîôûñç'\-]*)*$/;
    
    return nombreRegex.test(nombreTrim);
}
