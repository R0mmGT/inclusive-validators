function validate(fullName) {
    // Nombre completo válido: 
    //   Un espacio separa el primer nombre del apellido 
    //   Primero el nombre, luego el apellido de la persona. Ejemplo "John Doe"
    if (fullName.includes(" ")) {
        let namesArray = fullName.split(' ');
        
        if (namesArray.length < 2) return false;
        
        if (namesArray.every(name => /^[a-zA-Z]+$/.test(name))) return true;
        else return false;
    } 
    
    // Si no hay espacio, el nombre completo es inválido
    else {
        return false;
    }
}
