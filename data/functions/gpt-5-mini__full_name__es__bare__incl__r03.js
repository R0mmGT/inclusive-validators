function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacios al inicio/fin
  const s = name.trim();

  // No vacío y con una longitud razonable (evita entradas absurdas)
  if (s.length === 0 || s.length > 200) return false;

  // Debe contener al menos una letra (cualquier alfabeto/unicode)
  if (!/\p{L}/u.test(s)) return false;

  // No permitimos dígitos en los nombres
  if (/\p{N}/u.test(s)) return false;

  // Patrón para cada "parte" del nombre:
  // - empieza por una letra (\p{L}) seguida de marcas de combinación opcionales (\p{M}*)
  // - puede tener internamente conectores válidos (., -, ', ’, ʼ, ʻ, ·) seguidos de otra letra
  // - puede terminar opcionalmente en un punto (para iniciales)
  // Con esto aceptamos nombres de muchos alfabetos y convenciones (O'Neill, Jean-Luc, J. R. R., L·A etc.)
  const partRe = new RegExp(
    "^\\p{L}\\p{M}*(?:[\\.\\-\\'\\u2019\\u02BC\\u02BB\\u00B7]\\p{L}\\p{M}*)*\\.?$",
    "u"
  );

  // Separadores de palabras: uno o más espacios en blanco
  const parts = s.split(/\s+/);

  // Cada parte debe cumplir el patrón
  for (const part of parts) {
    if (!partRe.test(part)) return false;
  }

  return true;
}
