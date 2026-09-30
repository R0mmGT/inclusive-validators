function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Quitar espacios en los extremos
  const s = name.trim();

  // Longitud razonable para un nombre de pila (ajustable)
  if (s.length < 2 || s.length > 60) return false;

  /*
    Reglas principales:
    - Permitir letras Unicode y marcas combinantes (\p{L}\p{M})
    - Permitir separadores comunes en nombres: espacio, apostrofe ('), apostrofe tipográfico (U+2019),
      apóstrofo modificador (U+02BC) y guiones/dash (\p{Pd})
    - No permitir separadores consecutivos ni al inicio/fin
    - Cada "token" entre separadores debe contener al menos una letra
    Requiere soporte de escapes Unicode (\p{...}) y la bandera 'u'.
  */
  const nameRe = /^[\p{L}\p{M}]+(?:[ '\u2019\u02BC\p{Pd}][\p{L}\p{M}]+)*$/u;

  return nameRe.test(s);
}
