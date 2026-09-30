function validate(input) {
  if (typeof input !== 'string') return false;
  const name = input.trim();
  // longitud mínima/máxima razonable
  if (name.length === 0 || name.length > 80) return false;
  // Letras Unicode, permitiendo grupos de letras separados por un solo espacio, guion o apóstrofo.
  // Evita separadores al inicio/final y separadores consecutivos.
  const re = /^\p{L}+(?:[ '\-]\p{L}+)*$/u;
  return re.test(name);
}
