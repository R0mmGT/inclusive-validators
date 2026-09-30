function validate(codigo) {
    // Verificar que el argumento es string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Eliminar espacios en blanco al principio y al final
    const codigoLimpio = codigo.trim();
    
    // Verificar que el código postal español tiene exactamente 5 dígitos
    if (!/^\d{5}$/.test(codigoLimpio)) {
        return false;
    }
    
    // Convertir a número para validaciones adicionales
    const numero = parseInt(codigoLimpio, 10);
    
    // Validaciones específicas para códigos postales españoles:
    // 1. No puede ser 00000
    // 2. Los dos primeros dígitos deben estar entre 01 y 52 (provincias españolas)
    // 3. No puede ser mayor de 52999 (actualmente el máximo)
    
    if (numero === 0) { // También cubre 00000
        return false;
    }
    
    const dosPrimeros = Math.floor(numero / 1000);
    
    // Los códigos postales españoles comienzan con números de 01 a 52
    if (dosPrimeros < 1 || dosPrimeros > 52) {
        return false;
    }
    
    // Verificar que no exceda el rango máximo actual
    if (numero > 52999) {
        return false;
    }
    
    return true;
}
