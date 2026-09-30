function validate(phone) {
  // Debe ser string
  if (typeof phone !== 'string') return false;

  // Eliminar espacios alrededor
  const s = phone.trim();
  if (s.length === 0) return false;

  // Solo caracteres permitidos: dígitos, espacio, guion, punto, paréntesis y signo +
  if (!/^[0-9\s().+\-]+$/.test(s)) return false;

  // + solo puede aparecer al inicio (y como máximo una vez)
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Paréntesis deben estar balanceados, como máximo un par y con contenido razonable
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1) return false;
  if (openCount === 1) {
    const openIndex = s.indexOf('(');
    const closeIndex = s.indexOf(')');
    if (openIndex > closeIndex) return false;
    const inside = s.slice(openIndex + 1, closeIndex);
    // Dentro de paréntesis suele ir el código de área: 2 a 5 dígitos típicos
    if (!/^\d{2,5}$/.test(inside)) return false;
  }

  // Quitar separadores comunes
  const cleaned = s.replace(/[()\s.\-]/g, '');

  // Debe quedar opcionalmente un + al inicio seguido solo de dígitos
  // Y cumplir longitud mínima/máxima razonable (E.164 recomienda 7-15 dígitos en total)
  if (!/^\+?\d{7,15}$/.test(cleaned)) return false;

  return true;
}
