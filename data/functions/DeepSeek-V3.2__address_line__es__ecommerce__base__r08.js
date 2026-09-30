function validate(direccion) {
    // Verificar que sea un string no vacío
    if (typeof direccion !== 'string' || direccion.trim() === '') {
        return false;
    }
    
    const direccionLimpia = direccion.trim();
    
    // Longitud mínima y máxima razonable
    if (direccionLimpia.length < 5 || direccionLimpia.length > 100) {
        return false;
    }
    
    // Debe contener al menos un número (para número de calle)
    const contieneNumero = /\d/.test(direccionLimpia);
    if (!contieneNumero) {
        return false;
    }
    
    // Debe contener al menos una letra (para nombre de calle)
    const contieneLetra = /[a-zA-Z]/.test(direccionLimpia);
    if (!contieneLetra) {
        return false;
    }
    
    // Verificar formato básico: número seguido de texto o texto seguido de número
    // Ejemplos válidos: "Calle Mayor 123", "123 Main St", "Av. Libertador 1234"
    const formatoValido1 = /^\d+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-]+/.test(direccionLimpia); // Número al inicio
    const formatoValido2 = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-]+\s+\d+/.test(direccionLimpia); // Número al final
    const formatoValido3 = /^\d+\s*[a-zA-Z]+\s+\d+/.test(direccionLimpia); // Número en ambos lados (ej: "123B Main St")
    
    if (!(formatoValido1 || formatoValido2 || formatoValido3)) {
        return false;
    }
    
    // Caracteres permitidos: letras, números, espacios, puntos, guiones, comas, barras
    const caracteresPermitidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,\-\/]+$/;
    if (!caracteresPermitidos.test(direccionLimpia)) {
        return false;
    }
    
    // Evitar patrones sospechosos o no válidos
    const patronesInvalidos = [
        /^\d+$/, // Solo números
        /^[a-zA-Z]+$/, // Solo letras
        /test/i, // Palabra "test" (común en datos de prueba)
        /asdf/i, // Teclas consecutivas
        /123456789/, // Secuencia numérica obvia
        /aaaa/i, // Repetición de letras
    ];
    
    for (const patron of patronesInvalidos) {
        if (patron.test(direccionLimpia)) {
            return false;
        }
    }
    
    // Mínimo de palabras: al menos 2 palabras (ej: "Calle 123" o "123 Calle")
    const palabras = direccionLimpia.split(/\s+/).filter(palabra => palabra.length > 0);
    if (palabras.length < 2) {
        return false;
    }
    
    // Verificar que no haya palabras demasiado largas (posible sin sentido)
    for (const palabra of palabras) {
        if (palabra.length > 25) {
            return false;
        }
    }
    
    return true;
}
