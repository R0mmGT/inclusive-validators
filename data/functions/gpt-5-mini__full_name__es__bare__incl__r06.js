function validate(name) {
  // Validación robusta e inclusiva de "nombre completo" para muchas culturas:
  // - Permite cualquier letra Unicode (\p{L}) y marcas diacríticas (\p{M}).
  // - Permite conectores comunes en nombres: espacios, guiones, apóstrofes (incluido U+2019),
  //   punto (para iniciales/abreviaturas) y punto medio (·, usado en algunos nombres).
  // - Permite iniciales con punto (J., J.R.R., etc.) y palabras compuestas (Anne-Marie, O'Connor).
  // - Rechaza control chars, dígitos y símbolos típicos de correos/URLs (@, /, <, >, etc.).
  // - Acepta nombres escritos sin espacios (por ejemplo muchos nombres en chino/japonés).
  // - Requiere al menos dos letras en total (para evitar entradas vacías o puramente puntuación).
  //
  // Nota: No existe una definición universalmente correcta de "nombre completo" para todos
  // las culturas; esta función hace comprobaciones sintácticas inclusivas y razonables,
  // pero no pretende sustituir políticas locales o listas de validación específicas.
  if (typeof name !== 'string') return false;

  // Normalizar y comprobaciones básicas
  name = name.trim();
  if (name.length === 0 || name.length > 200) return false;

  // Rechazar control chars
  if (/[\u0000-\u001F\u007F]/.test(name)) return false;

  // Rechazar caracteres claramente no válidos en nombres personales:
  // dígitos y símbolos típicos usados en emails/URLs o código (se permite punto, guion y apóstrofo).
  if (/[0-9@<>\/\\\|\[\]\{\}\$\%\^\&\*\+\=\?~#:`;]/.test(name)) return false;

  // Sólo permitir letras Unicode, marcas diacríticas, espacios y conectores aceptados:
  // - ' (apóstrofo ASCII), \u2019 (apóstrofo tipográfico)
  // - - (guion)
  // - \u00B7 (punto medio ·)
  // - . (punto)
  // Las comprobaciones usan escapes de propiedad Unicode y la bandera u.
  const allowedRe = /^[\p{L}\p{M} \-'\u2019\u00B7\.]+$/u;
  if (!allowedRe.test(name)) return false;

  // Debe contener al menos dos letras Unicode en total (evita entradas como "." o "'")
  const letters = name.match(/\p{L}/gu);
  if (!letters || letters.length < 2) return false;

  // Cada "token" (separado por espacios) debe ser razonable:
  // - Puede ser una palabra compuesta de letras con conectores internos (O'Connor, Anne-Marie, St.John)
  // - Puede ser una secuencia de iniciales con punto (J., J.R.R.)
  // - Se permiten abreviaturas que terminan en punto (Dr., Sr.)
  //
  // Token regex explicado:
  // ^(?:                                   inicio alternación
  //    [\p{L}\p{M}]+                       una o más letras/diacríticos
  //    (?:[\'\-\u2019\u00B7\.][\p{L}\p{M}]+)*  opcional: (conector + letras)+
  //    \.?                                opcional: punto final (abreviatura)
  // |  (?:[\p{L}]\.)+                      o: una o más iniciales con punto (J. / J.R.R.)
  // )$
  const tokenRe = /^(?:[\p{L}\p{M}]+(?:[\'\-\u2019\u00B7\.][\p{L}\p{M}]+)*\.?|(?:[\p{L}]\.)+)$/u;

  const tokens = name.split(/\s+/);
  // Limitamos número de tokens razonable para evitar datos absurdos
  if (tokens.length > 10) return false;

  let hasMultiLetterToken = false;
  for (const t of tokens) {
    if (t.length === 0) return false; // doble espacio extraña (aunque .split(/\s+/) evita esto)
    if (!tokenRe.test(t)) return false;
    // Señalamos si hay al menos un token con 2 o más letras (ayuda a evitar sólo iniciales)
    const tLetters = (t.match(/\p{L}/gu) || []).length;
    if (tLetters >= 2) hasMultiLetterToken = true;
    // Evitar tokens excesivamente largos
    if (t.length > 100) return false;
  }

  // Aceptar nombres que sean únicamente iniciales + puntos + una palabra (p.ej. "J.R.R. Tolkien")
  // pero rechazar cadenas que sean sólo iniciales sin más (p.ej. "J. R.") excepto si la persona realmente
  // tiene sólo iniciales (opcional): aquí requerimos que exista al menos un token con >=2 letras
  // OR que haya al menos 2 letters totales (ya comprobado antes). Esta última comprobación previene
  // aceptar entradas de sólo puntuación o un único carácter.
  if (!hasMultiLetterToken && letters.length < 2) return false;

  return true;
}
