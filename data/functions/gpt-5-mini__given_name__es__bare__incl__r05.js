function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Normalizar y recortar espacios externos
  try {
    name = name.normalize('NFC');
  } catch (e) {
    // si normalize no existe, no pasa nada
  }
  name = name.trim();

  // No vacío y límite razonable de longitud (evita entradas maliciosas extremadamente largas)
  if (name.length === 0 || name.length > 100) return false;

  // Patrón Unicode que:
  // - exige que cada "token" empiece por una letra Unicode (\p{L})
  // - permite marcas combinantes (\p{M}) inmediatamente después de letras
  // - permite separadores entre tokens: espacios Unicode (\p{Zs}), signos de guion (\p{Pd}),
  //   apóstrofes comunes y variantes, y el punto medio (·) usado en algunos idiomas
  // - no permite dígitos ni otros signos de puntuación, ni separadores repetidos al principio/final
  // Este enfoque es una heurística amplia que cubre la gran mayoría de escrituras y convenciones.
  const namePattern = /^\p{L}[\p{L}\p{M}]*(?:[\p{Zs}\p{Pd}\u00B7\u2027\u0027\u2019\u02BC]\p{L}[\p{L}\p{M}]*)*$/u;

  return namePattern.test(name);
}
