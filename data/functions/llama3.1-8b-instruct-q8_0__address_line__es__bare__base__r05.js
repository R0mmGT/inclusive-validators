function validate(addr_street) {
    // Requerimientos iniciales:
    //  * Debe tener al menos cuatro caracteres.
    //  * Debe tener a lo más seis espacios en blanco y dígitos (para el número).
    //  * Su primera palabra no debe ser "Calle", pero sí puede tener otras palabras anteriores que describan una calzada.

    addr_street = addr_street.trim();   // Elimina espacios por la izquierda y derecha.
    
    if (addr_street.length < 4)          // Si es más corta de cuatro caracteres, retorna falso.
        return false;
        
    if ([...addr_street].filter(x => x.match(/[^\w\s]/)).length > 6)  
        return false;                      // No pueden haber más de seis dígitos.

    let no_st = addr_street.split(" ");  // Divide el string en espacios para verificar cada palabra.
    
    no_st.pop();                          // Elimina la última palabra, que es "Calle".

    if (no_st.includes('Calle') || no_st.includes('calle')) 
        return false;

    if ([...addr_street].filter(x => x.match(/^[a-zA-ZÑñ]/)).length > 4)
        return false;                      // La primera palabra solo debe comenzar en mayúscula.

    return true;
}
