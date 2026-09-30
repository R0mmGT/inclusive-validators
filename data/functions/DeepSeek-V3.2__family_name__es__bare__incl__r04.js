function validate(apellido) {
    // Verificar que el argumento sea un string
    if (typeof apellido !== 'string') return false;
    
    // Eliminar espacios al principio y al final
    const limpio = apellido.trim();
    
    // Validaciones básicas
    if (limpio.length === 0) return false;
    if (limpio.length > 100) return false; // Límite razonable para un apellido
    
    // Patrones que NO deberían aparecer en un apellido válido
    const patronesInvalidos = [
        /\d/,                           // Números
        /[{}<>\[\]()|\\\/@#$%^&*+=_]/,  // Caracteres especiales no comunes en apellidos
        /\.\./,                         // Puntos consecutivos
        /,,/,                           // Comas consecutivas
        /--/,                           // Guiones consecutivos
        /''/,                           // Apóstrofos consecutivos
        /\s{2,}/,                       // Múltiples espacios consecutivos
        /^[-',.\s]|[-',.\s]$/,          // Caracteres especiales al inicio o final
        /[^\p{L}\p{M}\s',.-]/u          // Cualquier carácter que no sea letra, marca diacrítica, espacio o los caracteres especiales permitidos
    ];
    
    for (const patron of patronesInvalidos) {
        if (patron.test(limpio)) return false;
    }
    
    // Validación de estructura básica
    // Debe contener al menos una letra (considerando todas las escrituras)
    const tieneLetra = /[\p{L}\p{M}]/u.test(limpio);
    if (!tieneLetra) return false;
    
    // Validar que los caracteres especiales permitidos estén usados correctamente
    // Apostrofos, guiones y puntos deben tener letras alrededor
    const caracteresEspeciales = /['.-]/g;
    let coincidencia;
    while ((coincidencia = caracteresEspeciales.exec(limpio)) !== null) {
        const indice = coincidencia.index;
        // Verificar que no esté al inicio ni al final (ya validado arriba)
        // Verificar que tenga letra antes o después
        const tieneLetraAntes = indice > 0 && /[\p{L}\p{M}]/u.test(limpio[indice - 1]);
        const tieneLetraDespues = indice < limpio.length - 1 && /[\p{L}\p{M}]/u.test(limpio[indice + 1]);
        
        if (!(tieneLetraAntes && tieneLetraDespues)) {
            // Casos especiales: apóstrofo al final (como en O'Connor) o guión como prefijo cultural
            // Permitir apóstrofo seguido de s al final (posesivo inglés)
            if (coincidencia[0] === "'" && indice === limpio.length - 2 && limpio[indice + 1].toLowerCase() === 's') {
                continue;
            }
            // Permitir guiones al inicio en algunos apellidos culturales (como -ez en algunos contextos)
            if (coincidencia[0] === '-' && indice === 0 && limpio.length > 1) {
                continue;
            }
            return false;
        }
    }
    
    // Validar que no haya múltiples caracteres especiales diferentes juntos
    if (/['.-]['.-]/.test(limpio)) return false;
    
    // Validaciones específicas por región/cultura
    const apellidoLower = limpio.toLowerCase();
    
    // Ejemplos de patrones comunes en diferentes culturas
    const patronesCulturales = {
        // Hispanos: terminaciones comunes como -ez, -az, -iz, -oz
        hispano: /^[a-záéíóúüñ\s'-]+(ez|az|iz|oz|is|es|as|os)$/i,
        // Italianos: terminaciones en -i, -o, -e, -ini, -etti
        italiano: /^[a-zàèéìíîòóù\s'-]+(i|o|e|ini|etti|ello|ella|ucci)$/i,
        // Ingleses: terminaciones en -son, -s, -ton, -ford, -worth
        ingles: /^[a-z\s'-]+(son|s|ton|ford|worth|wood|field|ley|stone)$/i,
        // Franceses: terminaciones en -eau, -el, -in, -on, -et, -ot
        frances: /^[a-zàâçéèêëîïôûùüÿœæ\s'-]+(eau|el|in|on|et|ot|aux|eux|ien)$/i,
        // Alemanes: terminaciones en -er, -mann, -stein, -berg, -dorf
        aleman: /^[a-zäöüß\s'-]+(er|mann|stein|berg|dorf|bach|feld|meier|hof)$/i,
        // Portugueses/brasileños: terminaciones en -es, -ães, -ões, -ins
        portugues: /^[a-záàâãéêíóôõúç\s'-]+(es|ães|ões|ins|az|ez|iz|oz)$/i,
        // Chinos (pinyin): normalmente 1-3 sílabas, sin caracteres especiales excepto guión
        chino: /^[a-zü\s-]+$/i,
        // Árabes (transliteración): al-, el-, ben-, ibn-, abu-
        arabe: /^(al|el|ben|ibn|abu|abou|abd)\s?-?[a-z\s'-]+$/i,
        // Rusos: terminaciones en -ov, -ev, -in, -sky, -skaya, -ko
        ruso: /^[a-z\s'-]+(ov|ev|in|sky|skaya|ko|vich|nova|ovna)$/i,
        // Griegos: terminaciones en -os, -as, -is, -opoulos, -akis
        griego: /^[a-z\s'-α-ωάέήίόύώϊϋΐΰ]+(os|as|is|opoulos|akis|idis|oglou)$/i,
        // Japoneses (romaji): normalmente vocales alternadas
        japones: /^[a-z\s-]+[aeiou]n?$/i,
        // Coreanos (romaja): normalmente 2-4 sílabas
        coreano: /^[a-z\s-]+[aeiou]?[mn]?$/i
    };
    
    // No requerir que coincida con un patrón específico, pero verificar que no sea obviamente inválido
    // Permitir múltiples palabras (apellidos compuestos)
    const palabras = limpio.split(/\s+/).filter(p => p.length > 0);
    
    // Cada palabra debe cumplir con reglas básicas
    for (const palabra of palabras) {
        // Longitud mínima por palabra (excepto prefijos como "de", "van", "al", etc.)
        const prefijosCortos = /^(de|van|von|di|da|del|della|dos|das|bin|ibn|al|el|o'|mc|mac|fitz|san|saint)$/i;
        if (palabra.length < 2 && !prefijosCortos.test(palabra)) return false;
        
        // No debe ser solo caracteres especiales
        if (/^[-',.]+$/.test(palabra)) return false;
    }
    
    // Aceptar apellidos válidos de cualquier cultura
    return true;
}
