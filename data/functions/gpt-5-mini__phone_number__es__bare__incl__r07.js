// Valida números de teléfono de forma amplia y tolerante para distintos países/culturas.
// Heurística:
// - Acepta formatos internacionales con '+' o con prefijos de salida comunes (00, 011).
// - Acepta separadores comunes: espacios, guiones, puntos, paréntesis.
// - Acepta extensiones (ext, x, #, etc.) y las ignora para la validación principal.
// - Normaliza dígitos árabe-indios (dos variantes) a dígitos ASCII.
// - Comprueba balance de paréntesis y que dentro de paréntesis haya solo dígitos/separadores.
// - Valida que el número resultante tenga entre 4 y 15 dígitos (rango razonable para números E.164 y formatos nacionales).
// Nota: No existe una única regla perfecta sin una base de datos por país; este validador ofrece una verificación práctica y
// conservadora para la mayoría de usuarios de todo el mundo sin librerías externas.
function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Normalizar prefijo "tel:" (URI)
  s = s.replace(/^\s*tel:\s*/i, '');

  // Convertir dígitos árabe-indios a ASCII si aparecen
  // \u0660-\u0669  => Arabic-Indic (٠١٢٣٤٥٦٧٨٩)
  // \u06F0-\u06F9  => Extended Arabic-Indic (۰۱۲۳۴۵۶۷۸۹)
  s = s
    .replace(/[\u0660-\u0669]/g, ch => String(ch.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, ch => String(ch.charCodeAt(0) - 0x06F0));

  // Extraer y eliminar extensión si existe (ext, x, extension, #, etc.)
  const extRegex = /(?:\b(?:ext|extension|ext\.|x|#)\b|\s+x\s+)\s*[:.\-]?\s*(\d{1,7})\s*$/i;
  const extMatch = s.match(extRegex);
  if (extMatch) {
    // quitar la parte de extensión
    s = s.slice(0, extMatch.index).trim();
  }

  // Paréntesis: comprobar que estén balanceados y que el contenido sea razonable
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  // Cada grupo entre paréntesis debe contener sólo dígitos y separadores comunes
  const parenRegex = /\(([^)]*)\)/g;
  let m;
  while ((m = parenRegex.exec(s)) !== null) {
    if (!/^[0-9 .\-]+$/.test(m[1])) return false;
    // evitar varios pares excesivos: generalmente no hay más de 2 paréntesis (uno par)
    if (openCount > 2) break; // no estrictamente invalidar, solo una salvaguarda ligera
  }

  // Manejar prefijos internacionales escritos sin '+': 00 (Europa), 011 (Norteamérica), etc.
  s = s.trim();
  let hadPlus = false;
  if (s.startsWith('+')) {
    hadPlus = true;
  } else if (s.startsWith('00')) {
    // tratar como equivalente a '+'
    s = '+' + s.slice(2);
    hadPlus = true;
  } else if (s.startsWith('011')) {
    // prefijo de salida de NANP
    s = '+' + s.slice(3);
    hadPlus = true;
  }

  // No permitir '+' en otra posición que no sea el inicio
  if (s.indexOf('+', 1) !== -1) return false;

  // Eliminar todo excepto dígitos (dejamos fuera el '+', que ya marcamos)
  const digits = s.replace(/[^\d]/g, '');

  // Validación de longitud:
  // - Máximo 15 dígitos según E.164.
  // - Mínimo 4 dígitos para cubrir la mayoría de números válidos internacionalmente (evita admitir cosas demasiado cortas).
  if (!/^\d+$/.test(digits)) return false;
  if (digits.length < 4 || digits.length > 15) return false;

  // Evitar casos manifestamente no telefónicos:
  // - Secuencias muy obvias de fecha/ID: si contiene separadores y grupos con tamaños típicos de fecha (ej. 4-2-2),
  //   la heurística es débil; no se intenta detectar todos los casos. Aquí sólo rechazamos entradas compuestas sólo por ceros.
  if (/^0+$/.test(digits)) return false;

  // Todo OK bajo la heurística aplicada
  return true;
}
