function validate(phoneString) {
    // Eliminar espacios en blanco al inicio y al final
    const trimmed = phoneString.trim();
    
    // Verificar que la cadena no esté vacía después de trim
    if (!trimmed) return false;
    
    // Patrones de validación:
    // 1. Número con prefijo internacional: +34 seguido de 9 dígitos
    // 2. Número con prefijo 00: 0034 seguido de 9 dígitos  
    // 3. Número nacional: 6, 7, 8 o 9 seguido de 8 dígitos
    // 4. Número con prefijo 34 sin + ni 00: 34 seguido de 9 dígitos
    
    // Expresión regular que cubre todos los casos válidos
    const regex = /^(?:(?:\+|00)34|34)?[6789]\d{8}$/;
    
    // Eliminar todos los espacios, guiones, puntos y paréntesis para validación
    const cleanNumber = trimmed.replace(/[\s\-\.\(\)]/g, '');
    
    // Verificar si coincide con el patrón
    return regex.test(cleanNumber);
}
