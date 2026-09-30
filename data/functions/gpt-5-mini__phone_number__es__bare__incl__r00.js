function validate(input) {
  // Acepta solo strings
  if (typeof input !== 'string') return false;

  // Eliminamos espacios iniciales/finales
  let s = input.trim();
  if (s.length === 0) return false;

  // Recortamos una posible extensión (ext, ext., extension, x, # ...), ignorando lo que venga después
  // Esto permite "555-1234 ext 89" o " +44 20 7946 0958 x123 "
  const extPattern = /\b(?:ext(?:ension)?|ext\.|x|#)\b/i;
  const extMatchIndex = s.search(extPattern);
  if (extMatchIndex !== -1) s = s.slice(0, extMatchIndex).trim();

  // Normalizaciones pequeñas: convertir plus de ancho completo a '+'
  s = s.replace(/\uFF0B/g, '+');

  // Validación de caracteres permitidos en la parte principal:
  // - Dígitos Unicode (\p{Nd}) (permite numerales en cualquier escritura)
  // - Espacios (\s)
  // - Signo '+' (solo uno y preferiblemente al inicio)
  // - Paréntesis, guiones, puntos, barras y punto medio (común en algunas escrituras)
  // Usamos bandera 'u' para soportar escapes Unicode como \p{Nd}
  const allowedRe = /^[+\p{Nd}\s().\-\/·]+$/u;
  if (!allowedRe.test(s)) return false;

  // '+' solo puede aparecer una vez y, si aparece, debe ser el primer carácter
  const plusMatches = s.match(/\+/g);
  if (plusMatches && plusMatches.length > 1) return false;
  if (plusMatches && s[0] !== '+') return false;

  // Paréntesis balanceados y en orden correcto
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') {
      depth++;
      // evitar paréntesis vacíos "()" que no son comunes en teléfonos
      if (i + 1 < s.length && s[i + 1] === ')') return false;
    } else if (ch === ')') {
      if (depth === 0) return false; // ')' sin '(' correspondiente
      depth--;
    }
  }
  if (depth !== 0) return false;

  // Contamos los dígitos Unicode (esto soporta numerales en escrituras no latinas)
  const digitMatches = s.match(/\p{Nd}/gu) || [];
  const digitCount = digitMatches.length;

  // Reglas de longitud razonables:
  // - Max 15 dígitos (E.164)
  // - Min 3 dígitos para permitir números cortos (112, 911, etc.)
  if (digitCount < 3 || digitCount > 15) return false;

  // Si empieza con '+' o con prefijo internacional '00' asumimos formato internacional;
  // si hay '+', debe haber al menos un dígito después (ya comprobado por digitCount >= 3)
  if (s[0] === '+') {
    // Aseguramos que tras el '+' hay al menos un dígito (puede haber espacios/paréntesis intercalados)
    const afterPlusDigits = s.slice(1).match(/\p{Nd}/u);
    if (!afterPlusDigits) return false;
  } else if (/^0{2}/.test(s.replace(/[\s().\-\/·]/g, ''))) {
    // Si comienza por '00' (prefijo internacional), aceptamos; ya contamos dígitos
  }

  // Evitamos que cadenas puramente separadores/prefijos pasen (por ejemplo: "+" o "++" ya filtrado)
  // y devolvemos verdadero si cumplimos todas las reglas anteriores
  return true;
}
