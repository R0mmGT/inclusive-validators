function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmed = str.trim();

  // Valida estructura: prefijo opcional (+ y código de país),
  // código de área opcional con paréntesis y números separados
  // opcionalmente por espacios, guiones o puntos sin caracteres repetidos.
  const phoneRegex = /^(?:\+?\d{1,4}[-.\s]*)?(?:\(\d{1,4}\)[-.\s]*)?\d{1,4}(?:[-.\s]?\d{1,4})*$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Verifica longitud de dígitos según el estándar internacional E.164 (7 a 15 dígitos)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
