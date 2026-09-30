function validate(input) {
  // Acepta solo strings
  if (typeof input !== 'string') return false;

  const s = input.trim();
  if (s.length === 0) return false;

  // No se permiten letras (ni 'x' para extensiones, etc.)
  if (/[A-Za-z]/.test(s)) return false;

  // '+' solo puede aparecer al principio si existe
  const plusIndex = s.indexOf('+');
  if (plusIndex > 0) return false;
  if (plusIndex === 0 && s.length === 1) return false; // solo '+' no es válido
  if (plusIndex === 0 && !/\+\d/.test(s)) return false; // si empieza con '+', el siguiente debe ser dígito

  // Solo se permiten los siguientes caracteres: dígitos, espacio, guion, punto, paréntesis y un '+' al principio
  if (!/^[\d\s\-\.\(\)\+]+$/.test(s)) return false;

  // Paréntesis deben estar balanceados y no cerrarse antes de abrir
  let balance = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') balance++;
    else if (ch === ')') {
      balance--;
      if (balance < 0) return false;
    }
  }
  if (balance !== 0) return false;

  // Cada grupo entre paréntesis debe contener al menos 1 dígito y no demasiados dígitos (ej. código de área)
  const parenGroups = s.match(/\([^\)]*\)/g) || [];
  for (const grp of parenGroups) {
    const inside = grp.slice(1, -1).trim();
    // no vacío y debe contener al menos un dígito
    if (inside.length === 0) return false;
    const digitsInside = inside.replace(/[^\d]/g, '');
    if (digitsInside.length === 0) return false;
    // limitar longitud razonable dentro de paréntesis (p. ej. 1..6 dígitos)
    if (digitsInside.length > 6) return false;
    // además no permitir caracteres "raros" dentro (ya filtramos letras)
    if (!/^[\d\s\-\.\+]*$/.test(inside)) return false;
  }

  // Contar dígitos totales y aplicar límites razonables (E.164 máximo 15). Mínimo 7 para números de contacto habituales.
  const digits = s.replace(/[^\d]/g, '');
  if (digits.length < 7 || digits.length > 15) return false;

  // Rechazar secuencias claramente inválidas como solo separadores (ya cubierto por conteo de dígitos),
  // o signos '+' en medio del número (ya controlado al principio).
  // Si pasa todas las comprobaciones, consideramos el teléfono válido.
  return true;
}
