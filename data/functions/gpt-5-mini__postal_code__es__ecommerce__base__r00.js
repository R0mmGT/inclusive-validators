function validate(postal) {
  // Aseguramos que sea string
  if (typeof postal !== 'string') return false;

  // Quitamos espacios en los extremos
  const s = postal.trim();

  // Código postal español: 5 dígitos, los dos primeros van de 01 a 52
  // Ejemplo de regex: 01xxx ... 52xxx
  const re = /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/;

  return re.test(s);
}
