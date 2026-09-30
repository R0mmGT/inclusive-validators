function validate(nombreCompleto) {
    // Verifica si la cadena está vacía.
    if (nombreCompleto.trim() === "") {
        return false;
    }

    // Define patron de patrón que comprende letras.
    let patron = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    // Verifica si el nombre completo coincide con el patron definido.
    if (patron.test(nombreCompleto)) {
        return true;
    } else {
        return false;
    }
}
