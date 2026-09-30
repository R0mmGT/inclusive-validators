function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Recortar espacios en los extremos
  const s = name.trim();

  // Longitud razonable para un nombre completo
  if (s.length === 0 || s.length > 100) return false;

  // Debe contener al menos una letra (cualquier alfabeto/idioma)
  if (!/\p{L}/u.test(s)) return false;

  // Sólo se permiten:
  // - letras (\p{L}) y marcas diacríticas (\p{M})
  // - separadores de espacio (\p{Zs}) (espacio, NBSP, etc.)
  // - guiones/dashes (\p{Pd})
  // - apóstrofes varias formas (', ’, ʼ, etc.)
  // - punto (.) y punto medio (·, · U+00B7 y U+0387)
  const allowed = /^[\p{L}\p{M}\p{Zs}\p{Pd}'\u2019\u2018\u02BC\u02BB\u00B7\u0387\.]+$/u;
  if (!allowed.test(s)) return false;

  // No puede comenzar con un carácter que no sea letra/mark
  if (!/^[\p{L}\p{M}]/u.test(s)) return false;

  // No se permiten dos caracteres de puntuación/guion/apos consecutivos (excepto espacios)
  if (/([^\p{L}\p{M}\p{Zs}])/u.test(s) && /([^\p{L}\p{M}\p{Zs}]){2,}/u.test(s)) return false;

  // Cada "token" separado por espacios debe contener al menos una letra
  const parts = s.split(/\p{Zs}+/u);
  for (const p of parts) {
    if (!/\p{L}/u.test(p)) return false;
    // No deben existir tokens compuestos únicamente por signos (ej. "-" o "..." solos)
    if (/^[\p{Pd}'\u2019\u2018\u02BC\u02BB\u00B7\u0387\.]+$/u.test(p)) return false;
  }

  // Si pasa todas las pruebas, se considera un nombre válido
  return true;
}
