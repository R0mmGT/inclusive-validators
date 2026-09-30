function validate(surname) {
  if (typeof surname !== 'string') return false;
  const str = surname.trim();
  // longitudes razonables (puedes ajustar según necesidades)
  if (str.length < 2 || str.length > 60) return false;
  // Permite letras Unicode (con marcas diacríticas), espacios, guiones y apóstrofes.
  // No permite separadores al inicio/final ni consecutivos, ni dígitos ni otros signos.
  // Ejemplos válidos: "García", "O'Connor", "Smith-Jones", "De la Fuente"
  const re = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(str);
}
