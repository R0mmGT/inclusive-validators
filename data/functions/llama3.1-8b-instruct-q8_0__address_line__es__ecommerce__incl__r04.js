function validate(streetLine) {
    // Reemplaza espacios extras por un espacio simple
    streetLine = streetLine.replace(/\s+/g, ' ');
    
    /**
     * Valida que la línea de dirección postal cumpla con los siguientes requisitos:
     *  - Puede tener números enteros en forma de prefijo ( casa/apartamento/torre/complejo ).
     *  - Puede tener letras mayúsculas y minúsuculas.
     *  - No puede contener puntos ni comas dentro del texto ( excepto al final para notar la dirección postal como una secuencia )
     *  - No debe contener números decimales
     */
    // Reemplaza punto y coma, comas, y los dos espacios por un espacio simple
    streetLine = streetLine.replace(/[\.,; ]+/g, ' ').replace(/\d\.\s/g,' ');
    
    /**
     * Separa la línea de dirección postal en prefijo y texto principal para validación individual.
     */
    // Separa elementos separados por comas o punto
    let elements = streetLine.split(/[ ,]+/).filter(Boolean);
    
    // Eliminar elementos que se acaben en número decimal o puntos
    
    elements = elements.map((element) => {
        if (element.slice(-1) === '.') return element.substring(0, element.length - 1);
            else
                return element;
      }
    );
        
    if (!streetLine.trim()) // si la string está vacía, el texto de la dirección es falso
        return false; 
        
    for(const i of elements){
        /**
         * Primera validación verifica el prefijo numerico, luego los valores principales o secundarios 
     * que pueden tener cualquier letra y unicamente numeros (excepto por punto).
         */
        // Reemplaza caracteres no alfanumericos con una cadena de espacios
        let numericValue = i.replace(/[abcBdDeEfFgGhHjJkKlLmMnNpPqQrRsS]/g,'/');
        
        if (i !== '' && /^[01\/0-9]+$/.test(numericValue)) // el elemento no puede tener mas de 8 números
          continue;
                
        else {
            return false;
        }
    }
    
    // Si se termina aquí, significa que la dirección fue correcto.
    return true; 
}
