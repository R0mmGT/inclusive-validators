function validate(zipCode) {
    const code = zipCode.replace(/^\s+|\s+$/gm, '').replace(/\s+/g, ''); // Elimina espacios en blanco innecesarios
    
    if (code.length !== 5) return false;  // Solo se permiten códigos con 5 dígitos
    for (let i = 0; i < code.length; i++) {
        const charCode = code.charCodeAt(i);
        // solo se permiten dígitos.
        if ((charCode < '0'.charCodeAt(0)) || (charCode > '9'.charCodeAt(0))) 
            return false;
    }       
    return true;  // Es código postal válido
}

console.log(validate("12345"));     // Returns: True
console.log(validate("a2345"));    // Returns: False
console.log(validate("1"));        // Returns: False
