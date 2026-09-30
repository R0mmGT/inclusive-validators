function validate(surname) {
  // Devuelve true si `surname` parece un apellido válido a nivel internacional.
  // Reglas (intento comprensivo, no perfecto):
  // - Debe ser una cadena no vacía.
  // - Permite letras de cualquier alfabeto Unicode (\p{L}) y marcas diacríticas (\p{M}).
  // - Permite separadores comunes en apellidos: espacio, guion, apóstrofes y variantes Unicode,
  //   punto y punto medio (ej. "O'Connor", "Smith-Jones", "van der Waals", "L·Ó").
  // - No permite que comience o termine con un separador.
  // - No permite separadores consecutivos (p. ej. "--", "  ", "''").
  // - Debe contener al menos una letra Unicode.
  // - Límite de longitud razonable para evitar abuso (200 caracteres).
  //
  // Esta validación intenta ser lo más inclusiva posible para distintas culturas,
  // pero ninguna heurística puede cubrir todos los casos excepcionales del mundo real.
  if (typeof surname !== 'string') return false;
  surname = surname.trim();
  if (surname.length === 0) return false;
  if (surname.length > 200) return false;

  // Caracteres separadores permitidos (incluye variantes de apóstrofo/okina, punto medio, punto y guion).
  // Notas: usamos escapes Unicode para algunas comillas tipográficas comunes.
  const surnameRegex = /^(?=.*\p{L})(?![ '\-\u2019\u02BC\u02BB\u2018\u201B\u00B7\.])(?!.*[ '\-\u2019\u02BC\u02BB\u2018\u201B\u00B7\.]$)(?!.*[ '\-\u2019\u02BC\u02BB\u2018\u201B\u00B7\.]{2,})[\p{L}\p{M} '\-\u2019\u02BC\u02BB\u2018\u201B\u00B7\.]+$/u;

  return surnameRegex.test(surname);
}
