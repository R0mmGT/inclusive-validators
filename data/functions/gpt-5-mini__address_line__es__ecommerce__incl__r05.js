function validate(line) {
  // Valida que una línea de dirección postal (calle) sea razonable para usos internacionales.
  // Reglas simples y permisivas: acepta texto Unicode (todas las escrituras), números,
  // puntuación y símbolos comunes en direcciones, pero rechaza entradas vacías,
  // de varias líneas, con caracteres de control, sólo puntuación/símbolos, o demasiado cortas/largas.
  if (typeof line !== 'string') return false;

  const s = line.trim();

  // Longitud razonable (ajusta si tu aplicación necesita otros límites)
  if (s.length < 3 || s.length > 200) return false;

  // No debe contener saltos de línea ni otros caracteres de control
  if (/[\r\n]/.test(s) || /[\p{C}]/u.test(s)) return false;

  // Debe contener al menos una letra o número (soporta escrituras no latinas)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // No permitir cadenas formadas únicamente por puntuación/símbolos/espacios
  if (/^[\p{P}\p{S}\p{Zs}\u00A0]+$/u.test(s)) return false;

  // Rechaza repeticiones extremas de un mismo signo de puntuación/símbolo (ej.: "////" o "----")
  if (/(?:([\p{P}\p{S}])\1\1\1)/u.test(s)) return false;

  // Acepta solo caracteres razonables para una dirección: letras, números, marcas, puntuación, símbolos y espacios
  if (!/^[\p{L}\p{N}\p{M}\p{P}\p{S}\p{Zs}]+$/u.test(s)) return false;

  return true;
}
