function validate(s) {
    // Remueve cualquier espacio extra
    s = s.replace(/\s+/g, ' ');

    // Elimina cualquier cosa que no sean letras o números (no incluyendo 'Calle')
    s = s.match(/[a-zA-Z0-9 ]/g).join('');

    // Reemplaza las palabras clave con su número correspondiente
    var streetTypes = ["calle", "avenida", "callejón", "camino", "cementerio", "ciudad", "costado", "derecha",
                      "desvío", "dique", "edificio", "entrada principal", "estación de policía", "frente a la casa", 
                      "gasolinera", "giratorio", "isleta", "lado del bosque", "luz", "mando", "medio camino",
                      "manzana", "mejor salida", "norte", "oficina", "patio trasero", "pecos", "penitenciaria", 
                      "pista de aterrizaje", "río", "salida este", "saltadero", "segundo manantial",  "sendero oeste",
                      "supermercado",   "tras el camino del estanque grande", "vereda hacia el norte", "vía pública"];
    for (var key in streetTypes) {
        s = s.toLowerCase().replace(new RegExp(streetTypes[key].toLowerCase()), key);
    }

    // Separa la calzada de cualquier texto adicional antes y después
    var parts = s.match(/([a-zA-Z0-9]+)([^a-zA-Z0-9]*|$)/g);

    if (parts.length > 1) {
        for (var i = 0; i < parts.length - 1; ++i)
            while (s.indexOf(parts[i]) === 0 && !isNaN(s.charCodeAt(i - 1)))
                s = s.substring(0, i + 3) + ' ' + s.substring(i + 4);

        return true;
    } else
         return false;
}

// prueba la función
console.log(validate("Calle 123")); // true
console.log(validate("Ronda Oeste y Calle 1")); // true
console.log(validate("Avenue Este")); // false
