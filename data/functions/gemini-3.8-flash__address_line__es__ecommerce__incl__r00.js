function validate(address) {
  // Comprobar que sea un string
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de calle a nivel global
  // (mínimo 3 caracteres para evitar entradas vacías o insignificantes, máximo 150)
  if (trimmed.length < 3 || trimmed.length > 150) {
    return false;
  }

  // Rechazar caracteres de control o caracteres comunes de inyección/código (<, >, {, })
  if (/[\u0000-\u001F\u007F-\u009F<>{}]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o ideograma en cualquier sistema de escritura del mundo (\p{L}),
  // lo cual evita que sea solo números (como un código postal erróneo) o únicamente signos de puntuación.
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  return true;
}
