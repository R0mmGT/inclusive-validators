function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Normalizar y recortar
  const str = name.trim();
  if (!str) return false;

  // Rechazar nombres demasiado largos o que contengan saltos de línea
  if (str.length > 160) return false;
  if (/[\r\n]/u.test(str)) return false;

  // Rechazar cifras arábigas (nombres con dígitos son extremadamente raros en nombres "personales")
  if (/\p{Nd}/u.test(str)) return false;

  // Reglas por token:
  // - Subparte: letra Unicode seguida de letras/marcas opcionales, opcionalmente un punto (iniciales).
  // - Conector dentro del token: apóstrofo, comillas tipográficas, guiones (clase Pd), punto medio, etc.
  // - Token: subparte (conector subparte)*
  // - Nombre completo: token (espacio+ token)*
  //
  // Usamos escapes Unicode (\p{L}, \p{M}, \p{Pd}, \p{Nd}) y la bandera 'u'.
  const sub = '\\p{L}[\\p{L}\\p{M}]*\\.?'; // e.g. "José", "J.", "李"
  const conn = "[\\'\\u2019\\u02BC\\p{Pd}\\u00B7\\u0387]"; // ', ’, ʼ, guiones, ·, · (varios puntos medios)
  const token = sub + '(?:' + conn + sub + ')*';
  const pattern = '^' + token + '(?:\\s+' + token + ')*$';
  const nameRe = new RegExp(pattern, 'u');

  // Validar con la expresión regular
  if (!nameRe.test(str)) return false;

  // Rechazar casos con puntuación repetida inapropiada (por ejemplo "..", "--", "''") dentro del string
  if (/([\'\u2019\u02BC\p{Pd}\u00B7\u0387\.])\1+/u.test(str)) return false;

  // Hecho: parece un nombre humano razonable (multicultural y unicode-aware)
  return true;
}
