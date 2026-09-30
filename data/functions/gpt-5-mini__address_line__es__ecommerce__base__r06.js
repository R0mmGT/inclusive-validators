function validate(input) {
  // Comprueba tipo y recorta espacios
  if (typeof input !== 'string') return false;
  const s = input.trim();
  // Longitud razonable para una línea de dirección
  if (s.length < 5 || s.length > 100) return false;

  // Debe contener al menos una letra (incluye acentos) y al menos un dígito (número de casa)
  if (!/\p{L}/u.test(s) || !/\d/.test(s)) return false;

  // Caracteres permitidos: letras (Unicode), dígitos, espacios y signos comunes en direcciones
  // (. , - / ' # º ª ° ( ) &)
  if (!/^[\p{L}\d\s\.\-,'\/#ºª°()&]+$/u.test(s)) return false;

  // Evita repeticiones excesivas de puntuación (por ejemplo "///" o "...")
  if (/[.\-,'\/#ºª°]{3,}/.test(s)) return false;

  // Debe contener un componente numérico válido para número de portal/local:
  // - número simple: 10
  // - con letra: 10B, 10º, 10ª
  // - rango: 5-7
  // - fracción o bloque: 12/3
  // Permitimos que ese componente esté seguido/precedido por palabras (p.e. "Blq", "Esc", "Apt")
  const numberComponent = /\d+[ºª°]?(?:[-\/]\d+[ºª°]?)?[A-Za-zºª°]?/u;
  if (!numberComponent.test(s)) return false;

  // Evitar que la dirección sea solo números y símbolos (ya comprobamos letra) o solo una palabra muy genérica
  // Rechazamos entradas con menos de 2 "palabras significativas" (letras o dígitos agrupados)
  const meaningfulParts = s.match(/[\p{L}\d]+/gu) || [];
  if (meaningfulParts.length < 2) return false;

  return true;
}
