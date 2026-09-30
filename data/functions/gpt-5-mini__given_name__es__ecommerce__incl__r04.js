// validate: comprueba si una cadena es un nombre de pila "válido" de forma amplia y multicultural.
// - Se permite cualquier letra Unicode (\p{L}) y marcas combinantes (\p{M}).
// - Se permiten separadores comunes en nombres: espacio, NBSP, apóstrofes (varios), guiones (varios) y punto medio.
// - No se permiten dígitos ni otros signos de puntuación. No se permiten separadores al principio/fin ni consecutivos.
// - Se normaliza Unicode (NFC), se recortan espacios y se limita la longitud (evita entradas absurdamente largas).
function validate(name) {
  if (typeof name !== 'string') return false;

  // Normalizar y recortar
  const s = name.normalize ? name.normalize('NFC').trim() : String(name).trim();

  if (s.length === 0) return false;
  if (s.length > 100) return false; // límite práctico; ajustar si lo desea

  // Conjunto de separadores permitidos (como escapes Unicode):
  // U+0020 space, U+00A0 no-break space,
  // U+0027 apostrophe, U+2019 right single quote, U+02BC modifier letter apostrophe,
  // U+002D hyphen-minus, U+2010 U+2011 U+2013 (varios guiones),
  // U+00B7 middle dot (interpunct)
  const sepEsc = '\\u0020\\u00A0\\u0027\\u2019\\u02BC\\u002D\\u2010\\u2011\\u2013\\u00B7';

  // Patrón:
  // ^\p{L}[\p{L}\p{M}]*(?:[separador]\p{L}[\p{L}\p{M}]*)*$
  // - Empieza por una letra Unicode
  // - Permite letras y marcas combinantes (acentos) después
  // - Permite grupos donde un separador va seguido de una letra+marcas (evita separadores consecutivos o al final)
  const pattern = `^\\p{L}[\\p{L}\\p{M}]*(?:[${sepEsc}]\\p{L}[\\p{L}\\p{M}]*)*$`;

  try {
    const re = new RegExp(pattern, 'u');
    return re.test(s);
  } catch (e) {
    // En entornos muy antiguos que no soporten escapes Unicode property, fallback prudente:
    // Aceptar solo letras ASCII básicas, espacios, guiones y apóstrofes (degradado).
    const fallback = /^[A-Za-z][A-Za-z' \-]{0,99}$/;
    return fallback.test(s);
  }
}
