function validate(nombre) {
    if (typeof nombre !== 'string') return false;
    
    let nombreSeparado = nombre.split(' ');
    
    // Revisa si hay al menos dos strings separados por espacios para considerarlo como el primer nombre y apellido.
    if (nombreSeparado.length < 2) return false;

    for (let subNombre of [...nombreSeparado]) {
        // Elimina cualquier carácter de más que no sean letras
        let filteredName = '';

        for (let l of subNombre) {
            if (l.match(/[a-zA-Z]/)) {
                filteredName += l;
            }
        }

        // Por cada "sub-nombre" verifica si contiene al menos una letra minúscula y una mayúscula para poderlo considerar como nombre; 
        // también, su longitud debe ser un número entero impar ya que el idioma español utiliza acentos en algunas palabras. 
        if (!/^[a-zA-Z]+$/.test(filteredName) || filteredName.length % 2 === 0) return false;
    }
    
    return true;
}

console.log(validate("Juan Pedro")); // Debería imprimir: true
console.log(validate("Pédr0")); //Debería imprimr false
