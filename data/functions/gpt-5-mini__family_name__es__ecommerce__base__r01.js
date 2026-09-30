function validate(surname) {
  if (typeof surname !== 'string') return false;
  const s = surname.trim();
  if (s.length === 0) return false;

  // Requisitos:
  // - Permite letras Unicode y marcas diacríticas (\p{L}\p{M})
  // - Permite puntos dentro de los tokens (para abreviaturas como "St.")
  // - Permite separadores: espacio, guion y apóstrofo (pero no consecutivos ni al inicio/final)
  // - Longitud entre 1 y 60 caracteres (ajustable)
  // - Debe contener al menos una letra
  const re = /^(?=.{1,60}$)(?=.*\p{L})(?!.*[ \-']{2})[\p{L}\p{M}\.]+(?:[ \-'][\p{L}\p{M}\.]+)*$/u;

  return re.test(s);
}
