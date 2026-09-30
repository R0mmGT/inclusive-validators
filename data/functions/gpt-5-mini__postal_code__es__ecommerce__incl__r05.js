function validate(input) {
  // Valida códigos postales de forma amplia y segura para la mayoría de países:
  // - acepta letras (cualquier alfabeto Unicode) y dígitos Unicode
  // - permite grupos separados por un espacio o un guion medio (no secuencias de separación)
  // - descarta control chars y entradas vacías
  // - exige una longitud razonable (2..10 caracteres alfanuméricos)
  if (typeof input !== 'string') return false;

  // Eliminar espacios al inicio/fin y normalizar Unicode
  const trimmed = input.trim();
  if (trimmed.length === 0) return false;
  const s = (typeof trimmed.normalize === 'function') ? trimmed.normalize('NFC') : trimmed;

  // Rechazar caracteres de control invisibles
  if (/\p{C}/u.test(s)) return false;

  // Patrón: grupos de letras/dígitos Unicode separados opcionalmente por un solo
  // espacio o un solo guion medio (ej. "A1A 1A1", "12345-6789", "1000")
  const pattern = /^[\p{L}\p{N}]+(?:[ -][\p{L}\p{N}]+)*$/u;
  if (!pattern.test(s)) return false;

  // Comprobar longitud razonable contando solo letras/dígitos (sin separadores)
  const core = s.replace(/[ -]/g, '');
  // Usamos iteración para contar correctamente caracteres Unicode compuestos
  const length = Array.from(core).length;
  if (length < 2 || length > 10) return false;

  return true;
}
