// Valida un "nombre completo" de forma amplia y compatible con muchos alfabetos.
// Reglas principales (intencionadas para máxima inclusividad):
// - Debe ser una cadena no vacía y razonablemente corta.
// - Solo se permiten letras Unicode, marcas diacríticas, espacios y algunos signos comunes en nombres:
//   guion (-), apóstrofo (' y ’), punto (.) y punto medio (·).
// - No se permiten dígitos, control chars, emails ni URLs.
// - Cada "token" (separado por espacios) debe empezar y acabar con una letra.
// - Se permiten iniciales como "J." o "É." y combinaciones como "O'Connor", "Jean-Luc", "李" o "김지수".
// - Evita secuencias de signos de puntuación repetidos.
// Nota: Usa Unicode property escapes (ES2018+).
function validate(name) {
  if (typeof name !== 'string') return false;

  // Normalizar y recortar
  let s = name.normalize ? name.normalize('NFC') : name;
  s = s.replace(/\u00A0/g, ' ').trim(); // reemplazar NBSP y recortar
  if (!s) return false;
  if (s.length > 200) return false; // límite razonable

  // Rechazar patrones obvios: emails, URLs
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(s)) return false;
  if (/\b(?:https?:\/\/|www\.)\S+/i.test(s)) return false;

  // No permitir dígitos
  if (/\p{Nd}/u.test(s)) return false;

  // Reemplazar cualquier secuencia de espacios por uno solo (usar solo espacio U+0020)
  s = s.replace(/\s+/g, ' ');

  // Conjunto de caracteres permitidos a nivel de cadena:
  // \p{L} = letras, \p{M} = marcas (diacríticos), \p{Zs} = separadores de espacio
  // Además: guion -, apóstrofos (' y ’ U+2019), ʼ U+02BC, punto '.' y punto medio U+00B7
  const allowedOverall = /^[\p{L}\p{M}\p{Zs}\-.'\u2019\u02BC\u00B7]+$/u;
  if (!allowedOverall.test(s)) return false;

  // No empezar ni terminar por un signo de puntuación permitido
  if (/^[\-.'\u2019\u02BC\u00B7]/u.test(s) || /[\-.'\u2019\u02BC\u00B7]$/u.test(s)) return false;

  // Separar por espacios y validar cada token
  const tokens = s.split(' ');
  if (tokens.length === 0) return false;

  // Inicial: una letra (más opcionales marcas) posiblemente seguida de un punto
  const initialRe = /^\p{L}[\p{M}]*\.?$/u;

  // Token "normal": empieza y termina con letra, y puede contener letras, marcas y los signos permitidos en el medio
  const tokenRe = /^[\p{L}\p{M}](?:[\p{L}\p{M}\-.'\u2019\u02BC\u00B7])*[\p{L}\p{M}]$/u;

  // Evitar secuencias de puntuación repetidas (ej.: "--", "''", "..")
  const repeatedPunct = /(?:[-.'\u2019\u02BC\u00B7]){2,}/u;

  for (const t of tokens) {
    if (!t || t.length === 0) return false;
    if (t.length > 100) return false; // token individual demasiado largo
    if (initialRe.test(t)) {
      // válido como inicial o letra con punto (por ejemplo "J." o "É")
      continue;
    }
    if (!tokenRe.test(t)) return false;
    if (repeatedPunct.test(t)) return false;
  }

  return true;
}
