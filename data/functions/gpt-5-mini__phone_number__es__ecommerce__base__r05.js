function validate(phone) {
  // Debe ser una cadena
  if (typeof phone !== 'string') return false;

  const s = phone.trim();
  if (s.length === 0) return false;

  // Solo se permiten dígitos, espacios, +, paréntesis, guiones y puntos
  if (!/^[0-9+\-\s().]+$/.test(s)) return false;

  // El signo +, si existe, solo puede aparecer al principio y solo una vez
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Paréntesis balanceados y en orden
  const openParens = (s.match(/\(/g) || []).length;
  const closeParens = (s.match(/\)/g) || []).length;
  if (openParens !== closeParens) return false;
  if (openParens > 0) {
    // comprobación simple: cada ')' debe venir después de un '('
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++;
      if (s[i] === ')') {
        depth--;
        if (depth < 0) return false;
      }
    }
    if (depth !== 0) return false;
  }

  // Contar solo los dígitos
  const digits = s.replace(/[^\d]/g, '');
  // Reglas razonables: entre 7 y 15 dígitos (compatible con formatos nacionales e internacionales)
  if (digits.length < 7 || digits.length > 15) return false;

  // Evitar secuencias inválidas de separadores (por ejemplo "--" o ".." o "  ")
  if (/[-.]{2,}| {2,}/.test(s)) return false;

  // Si pasa todas las comprobaciones, consideramos el número válido
  return true;
}
