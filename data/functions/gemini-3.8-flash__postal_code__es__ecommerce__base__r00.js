function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Valida el formato estándar más común en tiendas en línea:
  // 5 dígitos numéricos (España, México, Francia, Alemania, EE. UU., etc.)
  // y formato extendido ZIP+4 (ej. 12345 o 12345-6789)
  const regex = /^\d{5}(-\d{4})?$/;

  return regex.test(postalCode.trim());
}
