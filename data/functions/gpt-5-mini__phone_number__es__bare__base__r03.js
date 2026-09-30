function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Sólo se permiten dígitos, espacios, paréntesis, +, puntos y guiones
  if (!/^[0-9()+\s.-]+$/.test(s)) return false;

  // '+' como máximo una vez y sólo al comienzo si existe
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Paréntesis balanceados y como máximo un par; dentro sólo dígitos/espacios
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 1) return false;
  if (opens === 1) {
    // comprobar que hay una pareja correcta y que dentro hay al menos 1 dígito
    if (!/\(\s*\d+\s*\)/.test(s)) return false;
    if (s.indexOf('(') > s.indexOf(')')) return false;
  }

  // No permitir separadores dobles (espacio, guion, punto)
  if (/[ \-\.]{2,}/.test(s)) return false;

  // Extraer sólo dígitos y comprobar longitud razonable (entre 7 y 15 según E.164)
  const digits = s.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;

  // Si hay '+' al inicio, comprobar que hay un código de país (1-3 dígitos) tras él
  if (s[0] === '+') {
    const afterPlus = s.slice(1);
    const m = afterPlus.match(/^\s*(\d{1,3})/);
    if (!m) return false;
  }

  return true;
}
