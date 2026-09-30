function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar y recortar espacios alrededor
  const s = name.trim();
  if (s.length === 0) return false;

  // Limitar longitud razonable para evitar abusos (ajustable)
  if (s.length > 100) return false;

  // Normalizar a NFC para tratar combinaciones de letras y marcas de forma consistente
  const n = s.normalize('NFC');

  // Patrón Unicode:
  // - Cada "componente" debe empezar por una letra (\p{L}) y puede llevar marcas diacríticas (\p{M}) posteriores.
  // - Entre componentes se permiten:
  //    * uno o más espacios Unicode (\p{Zs}+), o
  //    * un signo de unión (guion/dash, apóstrofo tipográfico, apóstrofo ASCII, U+02BC, interpunct U+00B7)
  //      con posibles espacios alrededor (p. ej. "Smith - Jones" o "O' Connor").
  // - No se permiten dígitos, símbolos o puntuación no especificada.
  const re = new RegExp(
    '^' +
      '\\p{L}[\\p{L}\\p{M}]*' + // primer componente: letra + marcas opcionales
      '(?:' +
        '(?:' +
          '\\p{Zs}+' + // separador: espacios (uno o más)
          '|' +
          '(?:\\p{Zs}*(?:\\p{Pd}|\\' + "'" + '|\\u2019|\\u02BC|\\u00B7)\\p{Zs}*)' + // o guion/apóstrofo/interpunct con espacios opcionales
        ')' +
        '\\p{L}[\\p{L}\\p{M}]*' + // siguiente componente
      ')*' +
    '$',
    'u'
  );

  return re.test(n);
}
