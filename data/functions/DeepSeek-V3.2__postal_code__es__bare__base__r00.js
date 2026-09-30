function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Los códigos postales válidos en España tienen 5 dígitos
    // No pueden comenzar con 0 (según estándar español)
    const regex = /^[1-9][0-9]{4}$/;
    
    return regex.test(codigo);
}
