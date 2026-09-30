function validate(input) {
  // Debe recibir un string
  if (typeof input !== 'string') return false;

  // Normalizar entrada
  let s = input.trim();

  // Rechazar vacío
  if (s.length === 0) return false;

  // Quitar esquema tel: si lo hay
  s = s.replace(/^\s*tel:\s*/i, '');

  // Eliminar cualquier sufijo de extensión (ext, ext., extension, x, #) y lo que venga después
  s = s.replace(/(?:\bext\b|\bext\.\b|\bextension\b|\bx\b|#)[\s.:–-]*\d.*$/i, '').trim();

  // Reemplazar prefijo internacional "00" por "+" (muchos usuarios usan 00 como +)
  s = s.replace(/^\s*00(?=\d)/, '+');

  // Mantener solo dígitos y el signo + inicial (quitar espacios, guiones, paréntesis, puntos, etc.)
  // Primero quitar todo lo que no sea dígito o '+'.
  s = s.replace(/[^\d+]/g, '');

  // Solo puede haber un '+' y, si existe, debe estar al inicio
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.includes('+') && s[0] !== '+') return false;

  // Extraer solo los dígitos para contar longitud real del número
  const digits = s.replace(/\D/g, '');

  // Reglas razonables basadas en E.164:
  // - Máximo 15 dígitos en total (estándar E.164)
  // - Mínimo 6 dígitos para cubrir números válidos de usuarios (ajustable según necesidad)
  if (digits.length < 6 || digits.length > 15) return false;

  // Si empieza con '+', debe seguir únicamente dígitos
  if (s[0] === '+') {
    return /^\+\d{6,15}$/.test(s);
  }

  // Si no tiene '+', aceptar solo dígitos (números locales). Ya verificamos longitud.
  return /^\d{6,15}$/.test(s);
}
