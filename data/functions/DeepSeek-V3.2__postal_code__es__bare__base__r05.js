function validate(codigo) {
    // Verificar que el argumento sea un string
    if (typeof codigo !== 'string') {
        return false;
    }
    
    // Un código postal español válido tiene exactamente 5 dígitos
    const regex = /^[0-9]{5}$/;
    
    // Probar la coincidencia con la expresión regular
    return regex.test(codigo);
}
