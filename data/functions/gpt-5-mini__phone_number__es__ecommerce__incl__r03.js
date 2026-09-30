function validate(input) {
  // Validación robusta pero razonable sin librerías externas.
  // Acepta formatos internacionales con + o 00, separadores comunes (espacios, -, ., paréntesis)
  // permite sufijos de extensión (ext, x, #) al final — se ignoran para la validación principal.
  // Basado en la recomendación E.164: máximo 15 dígitos; mínimo práctico 4 dígitos.
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Rechaza + en medio del string (solo se permite al principio)
  if (s.indexOf('+') > 0) return false;

  // Elimina un sufijo de extensión si aparece al final (ej. "ext 123", "x123", "#123")
  const extSuffix = s.match(/(?:ext|extension|ext\.|x|#)\s*[:.]?\s*\d*$/i);
  if (extSuffix) {
    s = s.slice(0, extSuffix.index).trim();
    if (!s) return false;
  }

  // No permitimos letras (salvo las de la extensión ya eliminada). Se incluyen letras acentuadas.
  if (/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(s)) return false;

  // Paréntesis deben estar balanceados y contener solo dígitos y separadores dentro
  let balance = 0;
  for (let ch of s) {
    if (ch === '(') balance++;
    else if (ch === ')') balance--;
    if (balance < 0) return false; // cierre antes de apertura
  }
  if (balance !== 0) return false;

  // Cada contenido entre paréntesis debe ser dígitos y/o separadores comunes
  let parenRe = /\(([^)]*)\)/g;
  let m;
  while ((m = parenRe.exec(s)) !== null) {
    if (!/^[\d\s\-\.]*$/.test(m[1])) return false;
  }

  // Normaliza quitando separadores comunes (espacio, paréntesis, guión, punto)
  let normalized = s.replace(/[\s().-]/g, '');

  // Maneja prefijos internacionales: + o 00
  if (normalized.startsWith('+')) {
    normalized = normalized.slice(1);
  } else if (normalized.startsWith('00')) {
    normalized = normalized.slice(2);
  }

  // Ahora solo deben quedar dígitos
  if (!/^\d+$/.test(normalized)) return false;

  // Longitud según E.164 (máximo 15). Mínimo práctico 4 (muchos países usan 7-10)
  if (normalized.length < 4 || normalized.length > 15) return false;

  return true;
}
