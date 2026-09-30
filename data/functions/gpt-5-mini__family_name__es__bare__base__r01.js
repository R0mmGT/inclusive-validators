function validate(surname) {
  // Debe ser una cadena
  if (typeof surname !== 'string') return false;

  // Recortar espacios al inicio/final
  const str = surname.trim();

  // Longitud razonable para un apellido
  if (str.length < 2 || str.length > 100) return false;

  // Reglas:
  // - Sólo letras Unicode (y marcas de combinación), espacios, guiones y apóstrofes.
  // - No puede empezar ni terminar con separador (espacio/guion/apóstrofe).
  // - No puede haber separadores consecutivos.
  // - Cada segmento entre separadores debe tener al menos una letra.
  const re = /^(?!.*[ \-']{2})(?!^[ \-'])(?!.*[ \-']$)[\p{L}\p{M}]+(?:[ \-'][\p{L}\p{M}]+)*$/u;

  return re.test(str);
}
