function validateNombre(name) {
    // Si el nombre está vacío, no es válido.
    if (!name.trim()) {
        return false;
    }

    // Tenga en cuenta los nombres que comienzan con números o caracteres especiales.
    if (/[^a-zA-Z']/g.test(name[0])) {
        return false;
    }

    // Utilice una expresión regular para verificar las reglas de aprobación.
    let regex = /^[a-zA-Z'-]+ [a-zA-Z]+$/;

    // Si el nombre no coincide con la expresión regular, no es válido.
    if (!regex.test(name)) {
        return false;
    }

    // Compruebe que el nombre tenga al menos dos palabras, separadas por espacio o comillas simples.
    let palabras = name.split(/[' ']+/);
    
    // Si solo hay una palabra, no es válido.
    if (palabras.length < 2) {
        return false;
    }

    // Verifique que las últimas palabras no tengan más de dos caracteres (por ejemplo: "o", "de"), lo cual puede ser un nombre como "Sándorf de la" 
    palabras = palabras.slice(-3).reverse();
    let ultimosPalabras = '';
    for (let i=0 ; i<palabras.length; i++) {
        if(i==palabras.length-1){
            ultimosPalabras+=palabras[i];
        }else{
            ultimosPalabras+=' '+'"' + palabras[i]+'"';
        }
        
    }
    
    if (/^[a-zA-Z]{2}$/g.test(ultimosPalabras)) {
        return false;
    }

    // Si todas las comprobaciones anteriores pasaron, el nombre es válido.
    return true;
}
