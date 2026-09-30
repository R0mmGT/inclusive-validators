function validate(name) {
    // Verificar que el argumento sea un string
    if (typeof name !== 'string') {
        return false;
    }
    
    // Eliminar espacios al principio y final
    const trimmedName = name.trim();
    
    // Verificar que no esté vacío después de trim
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Verificar longitud mínima (al menos 2 caracteres)
    if (trimmedName.length < 2) {
        return false;
    }
    
    // Verificar longitud máxima (razonable para nombres)
    if (trimmedName.length > 50) {
        return false;
    }
    
    // Verificar que comience con letra mayúscula
    if (!/^[A-ZÁÉÍÓÚÜÑ]/.test(trimmedName)) {
        return false;
    }
    
    // Verificar que el resto sean letras, espacios, guiones o apóstrofes permitidos
    // Permitir letras, espacios, guiones, apóstrofes y algunos caracteres especiales
    const validNamePattern = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ'\- ]+$/;
    
    // Casos especiales como "McDonald", "O'Connor", "Jean-Pierre"
    const specialCasesPattern = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(['\- ][A-ZÁÉÍÓÚÜÑ]?[a-záéíóúüñ]+)*$/;
    
    // Verificar que no contenga números ni caracteres especiales no permitidos
    const invalidChars = /[0-9!@#$%^&*()_+=\[\]{};:"\\|,.<>?/~`]/;
    if (invalidChars.test(trimmedName)) {
        return false;
    }
    
    // Verificar que no tenga espacios múltiples consecutivos
    if (/\s{2,}/.test(trimmedName)) {
        return false;
    }
    
    // Verificar que no termine con espacio, guion o apóstrofe
    if (/[\s\-']$/.test(trimmedName)) {
        return false;
    }
    
    // Verificar que no comience con espacio, guion o apóstrofe después de la primera letra
    // (ya verificado arriba, pero para el resto del nombre)
    if (/^[A-ZÁÉÍÓÚÜÑ][\s\-']/.test(trimmedName)) {
        return false;
    }
    
    // Verificar patrones válidos
    if (!specialCasesPattern.test(trimmedName)) {
        return false;
    }
    
    // Lista de nombres válidos comunes (opcional, para mayor precisión)
    const commonNames = [
        'Juan', 'María', 'José', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Isabel',
        'David', 'Carmen', 'Javier', 'Lucía', 'Francisco', 'Sofía', 'Antonio',
        'Elena', 'Manuel', 'Paula', 'Pedro', 'Martina', 'Luis', 'Claudia',
        'Jorge', 'Valeria', 'Diego', 'Alba', 'Fernando', 'Noelia', 'Pablo',
        'Cristina', 'Ángel', 'Raquel', 'Sergio', 'Patricia', 'Ramón', 'Andrea',
        'Víctor', 'Rocío', 'Rubén', 'Natalia', 'Ignacio', 'Beatriz', 'Óscar',
        'Silvia', 'Alberto', 'Eva', 'Raúl', 'Teresa', 'Iván', 'Marina',
        'Andrés', 'Mónica', 'Joaquín', 'Lorena', 'Ricardo', 'Nuria', 'Samuel',
        'Inés', 'Enrique', 'Carla', 'Vicente', 'Esther', 'Emilio', 'Olga',
        'Julio', 'Consuelo', 'Guillermo', 'Alicia', 'Gonzalo', 'Julia',
        'Marcos', 'Irene', 'Hugo', 'Adriana', 'Jaime', 'Rosa', 'Salvador',
        'Angela', 'Tomás', 'Montserrat', 'Nicolás', 'Mercedes', 'Roberto',
        'Aurora', 'Lucas', 'Esperanza', 'Héctor', 'Pilar', 'Alejandro',
        'Manuela', 'Arturo', 'Encarnación', 'Félix', 'Juana', 'Alfonso',
        'Francisca', 'César', 'Dolores', 'Gregorio', 'Tomasa', 'Mario',
        'Soledad', 'Ernesto', 'Margarita', 'Fermín', 'Sara', 'Rafael',
        'Nicolasa', 'Agustín', 'Caridad', 'Domingo', 'Purificación',
        'Sebastián', 'Benita', 'Valentín', 'Ramona', 'Florencio', 'Josefa',
        'Herminio', 'Filomena', 'Leandro', 'Felipa', 'Cirilo', 'Rosario',
        'Cornelio', 'Marcela', 'Saturnino', 'Josefina', 'Román', 'Lidia',
        'Bonifacio', 'Matilde', 'Amador', 'Natividad', 'Casimiro', 'Visitación',
        'Ceferino', 'Dionisia', 'Eulogio', 'Dorotea', 'Fortunato', 'Eugenia',
        'Gumersindo', 'Flora', 'Honorio', 'Genoveva', 'Indalecio', 'Gertrudis',
        'Jacinto', 'Hilaria', 'Leocadio', 'Ignacia', 'Macario', 'Jacinta',
        'Nemesio', 'Leonor', 'Olegario', 'Luisa', 'Pascual', 'Marcelina',
        'Quintín', 'Martirio', 'Restituto', 'Modesta', 'Santiago', 'Narcisa',
        'Teodoro', 'Perpetua', 'Urbano', 'Priscila', 'Vital', 'Rita',
        'Wenceslao', 'Sabina', 'Xavier', 'Teodora', 'Yago', 'Ursula',
        'Zacarías', 'Virtudes', 'Abel', 'Yolanda', 'Ciro', 'Zoraida'
    ];
    
    // Convertir a formato estándar para comparación (sin acentos, en minúsculas)
    const normalize = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };
    
    const normalizedInput = normalize(trimmedName);
    const normalizedCommonNames = commonNames.map(normalize);
    
    // Verificar si el nombre está en la lista de nombres comunes
    if (!normalizedCommonNames.includes(normalizedInput)) {
        // Si no está en la lista, aplicar reglas más estrictas
        // Verificar que tenga al menos una vocal
        if (!/[aeiouáéíóúü]/i.test(trimmedName)) {
            return false;
        }
        
        // Verificar que no tenga combinaciones extrañas de caracteres
        const weirdPatterns = /(.)\1\1/; // 3 letras iguales seguidas
        if (weirdPatterns.test(trimmedName.toLowerCase())) {
            return false;
        }
        
        // Verificar proporción consonantes/vocales
        const vowels = trimmedName.match(/[aeiouáéíóúü]/gi);
        const consonants = trimmedName.match(/[bcdfghjklmnñpqrstvwxyz]/gi);
        const vowelCount = vowels ? vowels.length : 0;
        const consonantCount = consonants ? consonants.length : 0;
        
        if (vowelCount === 0 || consonantCount === 0) {
            return false;
        }
        
        // Proporción razonable (al menos 1 vocal por cada 4 consonantes)
        if (vowelCount < consonantCount / 4) {
            return false;
        }
    }
    
    return true;
}
