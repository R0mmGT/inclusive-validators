function validate(codigo) {
    // Validar que sea string y no esté vacío
    if (typeof codigo !== 'string' || codigo.length === 0) {
        return false;
    }
    
    // Expresión regular para código postal español:
    // 5 dígitos exactos, permitiendo espacios al inicio/final
    const regex = /^\s*(\d{5})\s*$/;
    
    const match = codigo.match(regex);
    
    if (!match) {
        return false;
    }
    
    // Extraer solo los dígitos
    const digitos = match[1];
    
    // Validaciones adicionales específicas para códigos postales españoles:
    
    // 1. Primeros dos dígitos: provincia (01-52, 53-54 para Ceuta/Melilla)
    const provincia = parseInt(digitos.substring(0, 2));
    
    // Provincias válidas: 01-52 (Álava a Zaragoza) y 53-54 (Ceuta y Melilla)
    // 00 no es válido
    if (provincia < 1 || provincia > 54) {
        return false;
    }
    
    // 2. Las provincias 51 y 52 no existen actualmente (fueron asignadas provisionalmente)
    if (provincia === 51 || provincia === 52) {
        return false;
    }
    
    // 3. Validar rangos específicos:
    // - 01-50: provincias peninsulares + Baleares
    // - 51-52: no asignados
    // - 53: Ceuta
    // - 54: Melilla
    // - 00: no válido
    
    // Todos los códigos 00000-00999 son inválidos
    if (provincia === 0) {
        return false;
    }
    
    // 4. Tercer dígito: ciudad/distrito postal (normalmente 0-9)
    // En España, el tercer dígito no tiene restricciones específicas (0-9 válidos)
    
    // 5. Últimos dos dígitos: zona/postal (normalmente 00-99)
    // No hay restricciones específicas
    
    return true;
}
