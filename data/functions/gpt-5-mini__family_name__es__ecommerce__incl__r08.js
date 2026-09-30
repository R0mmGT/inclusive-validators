function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios alrededor
  name = name.trim();

  // Vacío no permitido; límite de longitud razonable (evita abusos)
  if (name.length === 0 || name.length > 200) return false;

  /*
    Reglas:
    - Permite letras de cualquier alfabeto Unicode (\p{L}) y marcas diacríticas combinadas (\p{M}).
    - Permite separadores comunes dentro de apellidos: espacio, NBSP, guiones (varias formas),
      apóstrofes (ASCII y tipográfico), punto y punto medio (usado en algunas lenguas).
    - No permite dígitos ni otros signos/puntuación.
    - Un separador solo puede aparecer entre letras (no al inicio, ni al final, ni repetido).
  */
  const pattern = /^\p{L}\p{M}*(?:[ \u00A0\.\-\u2010\u2011\u2012\u2013\u2014'’\u00B7]\p{L}\p{M}*)*$/u;

  return pattern.test(name);
}
