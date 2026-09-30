function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar (si está disponible) para tratar combinaciones de diacríticos de forma consistente
  const s = (name.normalize ? name.normalize('NFC') : name).trim();

  // No vacío y longitud razonable (protección contra entradas absurdamente largas)
  if (s.length === 0 || s.length > 256) return false;

  // Patrón Unicode que:
  // - Empieza con una letra (\p{L})
  // - Permite marcas combinantes y ZWJ inmediatamente tras una letra ([\p{M}\u200d]*)
  // - Permite repetidamente un separador válido (espacio o NBSP, apóstrofes ascii y U+2019,
  //   punto medio U+00B7, punto, signos de dash Unicode \p{Pd}, ZWJ) seguido de una letra
  // - Evita separadores al inicio o al final y evita separadores consecutivos
  //
  // Esto cubre la mayoría de escrituras y convenciones de nombres: p. ej. "María José",
  // "Jean-Claude", "O'Connor", "李", "محمد", "Anne‑Marie" (con distintos guiones), etc.
  const pattern = /^\p{L}[\p{M}\u200d]*(?:[ \u00A0'’·\.\p{Pd}\u200d]\p{L}[\p{M}\u200d]*)*$/u;

  return pattern.test(s);
}
