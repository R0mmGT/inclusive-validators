function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmed = str.trim();
  
  // Verifica longitud razonable y que no tenga espacios al inicio o al final
  if (str !== trimmed || trimmed.length < 1 || trimmed.length > 60) {
    return false;
  }

  // Permite letras (incluyendo acentos y caracteres Unicode),
  // separadas por espacios, guiones o apóstrofes individuales.
  // Debe empezar y terminar con una letra.
  const surnameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return surnameRegex.test(str);
}
