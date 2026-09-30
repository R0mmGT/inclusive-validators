function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;
  // Permitir letras Unicode (y marcas diacríticas) y separadores simples: espacio, guion y apóstrofo
  // No permitir separadores al inicio/final ni separadores consecutivos
  const re = /^(?!.*[ '\-\u2019]{2})(?!^[ '\-\u2019])(?!.*[ '\-\u2019]$)[\p{L}\p{M}]+(?:[ '\-\u2019][\p{L}\p{M}]+)*$/u;
  return re.test(name);
}
