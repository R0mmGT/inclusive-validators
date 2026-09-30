function validate(input) {
  // Recibe un string y devuelve true si parece un número de teléfono válido, false en caso contrario.
  // Reglas aplicadas:
  // - Solo permite dígitos, espacios, guiones, puntos, paréntesis y un '+' opcional al inicio.
  // - Si hay paréntesis, solo se permite una pareja y su contenido debe ser 1-4 dígitos (p. ej. código de área).
  // - El '+' solo puede aparecer al principio y como máximo una vez.
  // - Tras eliminar separadores y signos se comprueba que quedan entre 7 y 15 dígitos (E.164 admite hasta 15).
  if (typeof input !== 'string') return false;
  var s = input.trim();
  if (s.length === 0) return false;
  if (s.length > 40) return false; // límite razonable para evitar inputs gigantescos

  // caracteres permitidos
  if (!/^[+\d().\s-]+$/.test(s)) return false;

  // '+' solo al principio y como máximo uno
  var plusMatches = s.match(/\+/g) || [];
  if (plusMatches.length > 1) return false;
  if (plusMatches.length === 1 && s[0] !== '+') return false;

  // paréntesis: misma cantidad de '(' y ')', a lo sumo una pareja
  var opens = (s.match(/\(/g) || []).length;
  var closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 1) return false;
  if (opens === 1) {
    var openIdx = s.indexOf('(');
    var closeIdx = s.indexOf(')');
    if (openIdx > closeIdx) return false;
    var inside = s.slice(openIdx + 1, closeIdx);
    // dentro de paréntesis solo dígitos y longitud 1-4
    if (!/^\d{1,4}$/.test(inside)) return false;
  }

  // eliminar separadores y signos para quedarnos solo con dígitos
  var digits = s.replace(/[+\s().-]/g, '');
  if (!/^\d+$/.test(digits)) return false;

  // verificar longitud de dígitos (mínimo 7, máximo 15)
  if (digits.length < 7 || digits.length > 15) return false;

  return true;
}
