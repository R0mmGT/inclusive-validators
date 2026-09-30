function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  // Comprobar longitud razonable para un apellido (1 a 100 caracteres)
  if (str.length === 0 || str.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura
  if (!/\p{L}/u.test(str)) {
    return false;
  }

  // Evitar separadores repetidos de forma consecutiva
  if (/ {2,}|\p{Pd}{2,}|\.{2,}|['’ʼʻ]{2,}/u.test(str)) {
    return false;
  }

  // Patrón para apellidos internacionales:
  // - Permite letras y marcas diacríticas de cualquier idioma (\p{L}, \p{M})
  // - Permite apóstrofes y okinas (' ’ ʼ ʻ), guiones (\p{Pd}), puntos y espacios
  // - Puede empezar con letra, marca o apóstrofe (ej. 'Alawi, ʻOkalani)
  // - Puede terminar con letra, marca, apóstrofe o punto (ej. St.)
  // - No permite iniciar ni terminar con espacios o guiones
  const surnameRegex = /^[\p{L}\p{M}'’ʼʻ](?:[\p{L}\p{M}'’ʼʻ\p{Pd}. ]*[\p{L}\p{M}'’ʼʻ.])?$/u;

  return surnameRegex.test(str);
}
