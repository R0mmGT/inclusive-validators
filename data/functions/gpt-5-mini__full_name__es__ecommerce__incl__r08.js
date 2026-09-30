function validate(input) {
  // Valida si `input` es un "nombre completo" razonable para uso en un formulario internacional.
  // Reglas prácticas (balance entre inclusividad y evitar basura):
  // - Acepta letras de cualquier idioma (Unicode), y marcas combinantes.
  // - Permite separadores típicos dentro de nombres: espacios, guiones, apóstrofes (varios tipos),
  //   puntos (para iniciales/abreviaturas) y punto medio.
  // - No permite dígitos ni signos/puntuación extraños.
  // - No permite que el nombre empiece o termine con guion/apóstrofe (un punto final es permitido
  //   para abreviaturas como "Jr." o iniciales "J.").
  // - No permite secuencias de puntuación repetida (ej. "--", "''", "..").
  // - Requiere al menos dos caracteres de letra en total (reduce entradas vacías/ruido).
  // - Longitud máxima razonable para un campo de formulario.
  //
  // Estas reglas son deliberadamente amplias para cubrir muchos formatos culturales
  // (nombres monosilábicos, multicomponentes, con diacríticos, scripts no latinos, etc.)
  // y al mismo tiempo filtran entradas obviamente inválidas.
  if (typeof input !== 'string') return false;

  const s = input.trim();

  // Longitud mínima y máxima (ajustable según necesidad).
  if (s.length < 2 || s.length > 200) return false;

  // Caracteres permitidos globalmente:
  // \p{L} = cualquier letra Unicode
  // \p{M} = marcas combinantes (diacríticos)
  // permitimos: espacio, guion -, apóstrofes (' y U+2019), saltillo/ʼ (U+02BC), punto medio (U+00B7), y punto .
  const allowedCharsRe = /^[\p{L}\p{M}\s\-\.'\u2019\u02BC\u00B7]+$/u;
  if (!allowedCharsRe.test(s)) return false;

  // No múltiples espacios consecutivos
  if (/\s{2,}/u.test(s)) return false;

  // No secuencias de puntuación (guiones/apóstrofes/puntos/middle-dot) consecutivas
  if (/[-\.'\u2019\u02BC\u00B7]{2,}/u.test(s)) return false;

  // Debe contener al menos dos letras en total (evita textos como "..." o "J." solo)
  const totalLetters = (s.match(/\p{L}/gu) || []).length;
  if (totalLetters < 2) return false;

  // Dividir por espacios para analizar cada "componente" del nombre
  const parts = s.split(/\s+/);

  // Cada parte debe ser razonable:
  // - No vacía
  // - No empezar ni acabar con guion/apóstrofe/punto medio (el punto final se permite como terminador de abreviatura)
  // - Contener al menos una letra
  // - No tener caracteres no permitidos (ya chequeado globalmente)
  // - No tener guion/apóstrofe/punto al inicio
  // - Si termina en '.', la porción anterior debe terminar en letra (ej. "J." o "Mr.")
  const apostrophes = ["'", "\u2019", "\u02BC"];
  const midDot = "\u00B7";

  for (const part of parts) {
    if (!part) return false;

    // Debe contener al menos una letra
    if (!/\p{L}/u.test(part)) return false;

    const first = part[0];
    const last = part[part.length - 1];

    // No comenzar con guion, apóstrofe, punto o punto medio
    if (first === '-' || apostrophes.includes(first) || first === '.' || first === midDot) return false;

    // No terminar con guion, apóstrofe o punto medio
    if (last === '-' || apostrophes.includes(last) || last === midDot) return false;

    // Si termina en punto, permitimos (abreviatura/inicial), pero la parte anterior al punto debe terminar en letra
    if (last === '.') {
      if (part.length < 2) return false; // no permitir solo "."
      const before = part[part.length - 2];
      if (!/\p{L}/u.test(before)) return false;
    } else {
      // si no termina en punto, entonces el último carácter debe ser letra o marca (no estrictamente necesaria, pero sensata)
      if (!/\p{L}|\p{M}/u.test(last)) return false;
    }

    // No permitir guion/apóstrofe/punto al lado de otro guion/apóstrofe/punto (por ejemplo: "-'", ".-", "..")
    if (/[-\.'\u2019\u02BC\u00B7]{2,}/u.test(part)) return false;

    // No permitir que una parte sea solamente una combinación de letras menos de 1 (ya chequeado), pero
    // permitir iniciales como "J." o "É." o "J.," (coma no permitida por reglas generales)
    // Aceptar también partes con guiones internos (Jean-Luc) o apóstrofes (O'Neill).
    // Comprobar que no haya guion/apóstrofe al inicio/fin (ya chequeado), y que no aparezcan repetidos.
    // Ya cubierto en reglas previas.
  }

  // Todo OK por heurística
  return true;
}
