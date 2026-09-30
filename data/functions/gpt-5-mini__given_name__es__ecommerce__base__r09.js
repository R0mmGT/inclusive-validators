function validate(name) {
  // Valida un nombre de pila (primer nombre) razonable para un formulario:
  // - debe ser string
  // - se recorta (trim) antes de validar
  // - longitud entre 1 y 60 caracteres (ajustable)
  // - solo letras Unicode (incluye acentos), marcas combinantes, espacios, guiones y apóstrofes
  // - no puede empezar ni acabar por espacio, guion o apóstrofe
  // - no permite separadores consecutivos (ej. "--", "  ", "''", "-'", etc.)
  //
  // Nota: usa escapes de propiedades Unicode (\p{L}, \p{M}) por compatibilidad con nombres internacionales.
  if (typeof name !== 'string') return false;

  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false;

  // Comprueba que el primer y último carácter sean una letra (no un separador)
  const isLetter = ch => /^\p{L}$/u.test(ch);
  if (!isLetter(s[0]) || !isLetter(s[s.length - 1])) return false;

  // Solo caracteres permitidos: letras, marcas (acentos), espacios, guion y apóstrofe
  const allowed = /^[\p{L}\p{M}'\- ]+$/u;
  if (!allowed.test(s)) return false;

  // No permitir separadores consecutivos (espacio, apóstrofe o guion)
  if (/[ '\-]{2,}/.test(s)) return false;

  // Todo ok
  return true;
}
