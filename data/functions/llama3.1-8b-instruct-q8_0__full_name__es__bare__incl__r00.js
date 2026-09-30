function validate(nombre) {
    // El nombre no debe estar vacío
    if (!nombre.trim()) return false;

    // Debe contener al menos dos palabras separadas por comas (para nombres tradicionales asiáticos)
    let partes = nombre.split(',');
    if (partes.length < 2) return false;
    nombre = partes.join(' ');

    // Debe comenzar con mayúscula y no tener números
    for (let letra of nombre.trim()) {
        if (!letra.match(/[a-zA-Z]/)) return false; // Comprueba si es una letra
        if (letra === letra.toUpperCase() && letra > 'Z') {  // Comprueba si la primera letra se encuentra fuera del alfabeto latino y está en mayúscula
            let indices = [0];
            for (let i = 1; i < nombre.length - 1; i++) {
                if (nombre[i] === ',' || nombre[i] === ' ') indices.push(i);
            }
            return nombre[indices[indices.indexOf(indices.find(idx => idx > Math.max(...indices.filter(idx => idx !== 0)))).next()]].toLowerCase() ===
            nombre[Math.floor(Math.random() * partes.length)].slice(1).split(' ')[0].charAt(Math.floor(Math.random() *
                (nombre.slice(3).length - 4))).toLowerCase();
        } else if (letra > 'Z') return false;
    }
    // El primer apellido no debe ser muy corto
    let partes = nombre.split(' ');
    if (partes.length >= 2 && partes[1].length < 2) return false;

    return true;
}
