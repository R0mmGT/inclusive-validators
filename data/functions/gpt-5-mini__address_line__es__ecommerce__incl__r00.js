// validate: comprueba de forma razonablemente permissiva si una cadena puede ser
// una línea de dirección postal (calle) válida para usuarios de cualquier país.
// Reglas (equilibrio entre inclusividad y rechazo de entradas claramente inválidas):
// - debe ser string, trimmed length entre 3 y 200 caracteres
// - no debe contener caracteres de control ni saltos de línea
// - no debe contener los signos de ángulo '<' o '>' (evita inserciones HTML obvias)
// - debe contener al menos una letra o un número (soporta alfabetos Unicode)
// - se rechazan entradas que parezcan URLs o correos electrónicos
// - se rechazan secuencias largas de sólo signos de puntuación (spam/ruido)
// Esta validación es deliberadamente permisiva: las direcciones varían mucho por país.

function validate(input) {
  if (typeof input !== 'string') return false;

  const s = input.trim();

  // longitud razonable para una línea de dirección
  if (s.length < 3 || s.length > 200) return false;

  // No permitir saltos de línea ni otros caracteres de control
  if (/[ \t]*[\r\n]/.test(s) || /\p{C}/u.test(s)) return false;

  // Rechazar signos de ángulo (frecuente fuente de inyección/HTML)
  if (s.includes('<') || s.includes('>')) return false;

  // Debe contener al menos una letra o número (soporta alfabetos Unicode)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Rechazar cosas que claramente no son direcciones: URLs, correos
  if (/(https?:\/\/|www\.)/i.test(s)) return false;
  if (/[^\s]+@[^\s]+/.test(s)) return false;

  // Rechazar secuencias largas de puntuación/símbolos sin letras/números
  // (por ejemplo "!!!!!!!" o "-----" repetido muchas veces)
  if (/[^\p{L}\p{N}\s]{6,}/u.test(s)) return false;

  // Evitar cadenas compuestas prácticamente sólo por signos de puntuación y espacios
  // (pero permitir combinaciones normales con letras/números)
  const onlyPunctAndSpace = /^[\p{P}\p{S}\s]+$/u;
  if (onlyPunctAndSpace.test(s)) return false;

  // Si pasa todas las comprobaciones, consideramos la línea aceptable.
  return true;
}
