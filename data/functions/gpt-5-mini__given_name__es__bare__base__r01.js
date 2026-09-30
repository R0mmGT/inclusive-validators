function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Normalizar y recortar espacios al inicio/fin
  const s = name.normalize('NFC').trim();

  // Longitud razonable para un nombre de pila
  if (s.length < 2 || s.length > 60) return false;

  // No permitir dígitos
  if (/\d/.test(s)) return false;

  // No permitir dos separadores consecutivos (espacio, apóstrofo, guion)
  if (/[ '\-]{2}/.test(s)) return false;

  // Debe empezar y terminar por una letra Unicode; se permiten letras con marcas diacríticas,
  // espacios simples, apóstrofos y guiones en medio.
  // Requiere la bandera 'u' para soportar \p{L} y \p{M}
  const re = /^\p{L}[\p{L}\p{M}'\-\s]*\p{L}$/u;
  return re.test(s);
}
