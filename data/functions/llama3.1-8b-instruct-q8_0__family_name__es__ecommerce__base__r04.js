function validateLastName(lastName) {
    // Primero, nos aseguramos de que la entrada sea una cadena no vacía y tenga al menos 1 carácter.
    if (typeof lastName !== 'string' || lastName.trim() === '') {
        return false;
    }
    
    // Luego, comprobamos si el apellido contiene solo letras y espacios. Si lo hace, devolvemos TRUE (verdadero).
    const regex = /^[a-zA-Z\s]+$/;
    if (regex.test(lastName)) {
        return true;
    } else {
        return false;
    }
}
