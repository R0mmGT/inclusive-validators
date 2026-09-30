function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // La mayoría de los códigos postales a nivel mundial tienen entre 2 y 12 caracteres (incluyendo separadores)
  if (trimmed.length < 2 || trimmed.length > 12) {
    return false;
  }

  // Permite combinaciones alfanuméricas con guiones o espacios sencillos como separadores
  // No permite separadores consecutivos ni al principio o final
  const structureRegex = /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
  if (!structureRegex.test(trimmed)) {
    return false;
  }

  // Prácticamente todos los códigos postales en el estándar de la UPU contienen al menos un dígito
  if (!/\d/.test(trimmed)) {
    return false;
  }

  // La cantidad neta de caracteres alfanuméricos debe estar entre 2 y 10
  const cleanLength = trimmed.replace(/[\s-]/g, '').length;
  if (cleanLength < 2 || cleanLength > 10) {
    return false;
  }

  return true;
}
