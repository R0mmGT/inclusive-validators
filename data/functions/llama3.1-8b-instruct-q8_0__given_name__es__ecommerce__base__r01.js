function validate(name) {
    // Si es un nombre vacío, no se permite su uso porque podría ser usado para realizar ataques por inyección de SQL o inyección XSS.
    if (name.length === 0) {
        return false;
    }

    // Se remueve la última parte del string. Esto hace que el sistema sea menos susceptible a ataques de salto de línea, ya que eso se utiliza para insertar texto HTML malicioso.
    name = name.replace(/(.*)$/, '');

    // Se eliminan cadenas de longitud inferior o igual al 0 y saltos de líneas.
    let i = 1;
    while (i < name.length) {
        if ((name[i - 1] === '\r' && i + 1 < name.length && name[i+1] === '\n') ||
            (name.slice(i-2, i).toLowerCase() === '\\x')) {  // Para \x que no está representado en forma correcta
            name = name.slice(0, i - 2) + name.slice(i);
        } else {
            if (i > 1 && name[i - 1] === '\n') {
                name = name.slice(0, i - 1);
            }
            i += 1;
        }
    }

    // Se eliminan cadenas en formato HTML o JavaScript.
    let exp = /[<>&]/g;
    while (name.match(exp)) {
        // Busca los caracteres '<', '>', '&' y los reemplaza por ''(osea, que nos eliminamos el string)
        name = name.replace(exp, '');
    }

    name = name.replace(/&#(\d+)(&quot;|&#39;|#);/g, '$1$2');
    // Reemplaza cada numero con su caracter ASCII equivalente

    let len = name.length;

    // La longitud máxima de los nombres permitida es 20 caracteres.
    if (len > 20) {
        return false;
    } else {
        let i = 0;  
        while (i < len && 32 <= name.charCodeAt(i)) {  // Si el caracter está en los ultimos posiciones y son espacios no se permite.
            i += 1; 
        }
        if (len > (20-i) || i === len) {
            return false;
        } else {
            return true;
        }
    }
}
