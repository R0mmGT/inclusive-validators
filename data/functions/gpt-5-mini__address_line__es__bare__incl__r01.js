function validate(input) {
  // Validación básica de tipo y normalización Unicode
  if (typeof input !== 'string') return false;
  // Normalizar para evitar combinaciones raras y quitar espacios alrededor
  const s = input.normalize ? input.normalize('NFC').trim() : input.trim();

  // Longitud razonable: acepta direcciones cortas y largas pero evita entradas vacías o excesivas
  if (s.length < 2 || s.length > 200) return false;

  // Rechazar controles invisibles (incluye Cc, Cf, Cs...), saltos de línea y caracteres de control
  if (/\p{C}/u.test(s)) return false;
  if (/\r|\n/.test(s)) return false;

  // No permitir los signos de menor/ Mayor (riesgo de HTML/inyección) — muchos formatos de dirección no usan < >
  if (/[<>]/.test(s)) return false;

  // Debe contener al menos una letra o número (soporte Unicode para alfabetos no latinos)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Sólo permitir categorías razonables: letras, números, puntuación y separadores de espacio
  // Esto permite caracteres de direccion típicos: letras de cualquier alfabeto, números, signos como .,/#-()[]:;ºª° etc.
  if (!/^[\p{L}\p{N}\p{P}\p{Zs}]+$/u.test(s)) return false;

  // Evitar repeticiones raras de un mismo símbolo de puntuación (p. ej. "!!!!!" o "----")
  // Permitimos hasta 2 repeticiones consecutivas de un símbolo de puntuación razonablemente
  if (/([^\p{L}\p{N}\s])\1{2,}/u.test(s)) return false;

  // Evitar espacios excesivos consecutivos (probablemente indicativo de entrada inválida)
  if (/\s{6,}/.test(s)) return false;

  // Evitar entradas que sean puramente símbolos/puntuación (aunque ya pedimos letra o número, redundante pero segura)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Si pasa todas las reglas anteriores, se considera una línea de dirección plausible
  return true;
}
