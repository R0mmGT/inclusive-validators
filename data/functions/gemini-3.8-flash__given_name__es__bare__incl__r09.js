function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Comprobar una longitud razonable (de 1 a 100 caracteres)
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode
  if (!/\p{L}/u.test(name)) {
    return false;
  }

  // Valida que el nombre esté compuesto por letras Unicode y marcas diacríticas,
  // permitiendo apóstrofos, guiones y espacios individuales no consecutivos.
  // No permite números ni caracteres de puntuación/separadores al inicio o al final.
  const nameRegex = /^[\p{L}\p{M}'’ʼ](?:[ \-]?[\p{L}\p{M}'’ʼ]+)*$/u;

  return nameRegex.test(name);
}
