function validate(line) {
  // Debe ser string
  if (typeof line !== 'string') return false;
  const s = line.trim();
  // Longitud razonable para una línea de calle
  if (s.length < 3 || s.length > 120) return false;

  // Rechazar cosas que claramente no son direcciones
  if (/@/.test(s)) return false; // no emails
  if (/https?:\/\//i.test(s)) return false; // no URLs

  // Caracteres permitidos: letras unicode (incluye acentos), marcas, dígitos,
  // espacios, comas, puntos, comillas, guiones, barras, almohadilla, º/ª, paréntesis, ampersand, grado
  const allowed = /^[\p{L}\p{M}\d\s\.,'"\-\/#ºª()&°]+$/u;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra (nombre de calle) y o bien un número o "s/n" (sin número)
  if (!/\p{L}/u.test(s)) return false;

  // Token numérico válido: número de 1 a 5 cifras (p.ej. 10), número con sufijo (10A, 10º), o rango (10-12),
  // o el texto "s/n" (varias variantes).
  const numberToken =
    /\b\d{1,5}\b/u.test(s) ||                // 10
    /\b\d{1,5}[ºª]?\p{L}\b/u.test(s) ||     // 10A, 10ºB
    /\b\d{1,5}[\/-]\d{1,5}\b/u.test(s) ||   // 10-12 o 10/12
    /\bS\s*\/\s*N\b/i.test(s) ||            // S/N
    /\bS\.?N\.?\b/i.test(s);                // S.N. ó SN

  if (!numberToken) return false;

  // Evitar secuencias de puntuación excesivas (ej.: "...", "---")
  if (/[.,\/\-#]{3,}/.test(s)) return false;

  // Evitar tokens extremadamente largos (probable dato basura)
  const tokens = s.split(/\s+/);
  if (tokens.some(t => t.length > 40)) return false;

  // Evitar que la línea sea solo número + abreviatura extraña sin nombre de vía
  // (por ejemplo: "12345" ya fue descartado por la comprobación de letra)
  // Aceptar casos comunes como "10 Downing Street" o "C/ Mayor, 10"
  return true;
}
