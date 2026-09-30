function validate(name) {
  // Devuelve true si `name` parece un "nombre completo" válido para usuarios
  // de cualquier país/alfabeto. No usa librerías externas.
  if (typeof name !== 'string') return false;

  // Normalizar espacios
  const s = name.trim().replace(/\s+/g, ' ');
  if (s.length === 0) return false;
  if (s.length > 100) return false; // límite razonable para evitar abusos

  // Debe contener al menos una letra de cualquier alfabeto
  if (!/\p{L}/u.test(s)) return false;

  // Rechazar caracteres de control invisibles
  if (/[\p{C}]/u.test(s)) return false;

  // Opcional: rechazar dígitos (nombres raramente contienen números);
  // si quiere permitir números en nombres, quite esta comprobación.
  if (/\p{N}/u.test(s)) return false;

  // Definimos lo que consideramos una "parte" de nombre:
  // - empieza por una letra Unicode (\p{L})
  // - puede llevar marcas combinantes (\p{M}) opcionales
  // - puede contener guiones o apóstrofos internos seguidos por letras
  // - puede terminar opcionalmente en un punto (para iniciales/abreviaturas)
  // Soporta apóstrofos ASCII y variantes comunes (’ ʼ ＇)
  const part = "(?:\\p{L}\\p{M}*(?:['\\u2019\\u02BC\\uFF07\\-]\\p{L}\\p{M}*)*(?:\\.)?)";

  // Una cadena válida es una o más partes separadas por espacios
  const re = new RegExp("^" + part + "(?:\\s+" + part + ")*$", "u");

  if (!re.test(s)) return false;

  // No permitir una lista excesiva de partes (protección básica)
  if (s.split(' ').length > 10) return false;

  return true;
}
