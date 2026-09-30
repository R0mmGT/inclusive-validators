function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  // Debe tener entre 2 y 12 caracteres en total
  if (code.length < 2 || code.length > 12) {
    return false;
  }

  // Permite caracteres alfanuméricos internacionales con guiones o espacios no consecutivos
  // No puede iniciar ni terminar con espacios o guiones
  const formatRegex = /^[A-Za-z0-9](?:[A-Za-z0-9]|[- ](?=[A-Za-z0-9])){0,10}[A-Za-z0-9]$/;
  if (!formatRegex.test(code)) {
    return false;
  }

  // Los códigos postales de la Unión Postal Universal (UPU) tienen entre 2 y 10 caracteres alfanuméricos
  const alnumCount = code.replace(/[^A-Za-z0-9]/g, '').length;
  return alnumCount >= 2 && alnumCount <= 10;
}
