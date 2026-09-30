function validate(line) {
  // Debe ser string
  if (typeof line !== 'string') return false;

  // Recortamos espacios al inicio/final
  const s = line.trim();

  // Longitud razonable para una línea de dirección
  if (s.length < 3 || s.length > 100) return false;

  // Rechazar caracteres potencialmente peligrosos o de control
  // (por ejemplo: signos de menor/mayor, llaves, corchetes, barra invertida)
  if (/[<>\\\[\]{}]/.test(s)) return false;

  // Requerir al menos una letra (incluye letras Unicode, acentos, etc.)
  if (!/\p{L}/u.test(s)) return false;

  // Conjunto de caracteres permitidos en una línea de dirección típica:
  // letras, números, espacios, puntuación usual en direcciones (.,#/-()'ºª°:;¡!¿?&·)
  const allowed = /^[\p{L}\p{N}\s\.\,#\/\-\(\)'ºª°:;¡!¿?&·]+$/u;

  return allowed.test(s);
}
