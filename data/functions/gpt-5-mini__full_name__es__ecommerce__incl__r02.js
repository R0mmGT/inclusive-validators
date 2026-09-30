function validate(name) {
  // Valida que "name" sea un nombre completo/realista y lo haga de forma lo más
  // internacional posible usando propiedades Unicode.
  // Reglas principales aplicadas:
  // - Debe ser una cadena no vacía, trimmed, con longitud razonable (2..100).
  // - No se permiten dígitos ni símbolos extraños. Solo letras (de cualquier escritura),
  //   marcas combinantes, espacios, guiones, apóstrofes, puntos (para iniciales/abreviaturas)
  //   y el punto medio (·) usado en algunos idiomas.
  // - Las partes (separadas por espacios) deben ser:
  //     * secuencias de letras, o
  //     * iniciales como "J." o secuencias de iniciales "J.K.", o
  //     * compuestos con guion/apóstrofe/middle-dot donde cada segmento sea letras.
  // - No se admiten segmentos vacíos (p. ej. "John--Doe" es inválido).
  // - Se permiten nombres de una sola palabra (p. ej. culturas sin separación entre nombre y apellido),
  //   siempre que contengan al menos 2 letras; de lo contrario se recomiendan al menos 2 tokens.
  //
  // Nota: requiere soporte de escapes de propiedades Unicode en la RegExp (es decir, el flag 'u').

  if (typeof name !== 'string') return false;
  const trimmed = name.trim();

  if (trimmed.length < 2 || trimmed.length > 100) return false;

  // Rechazar si contiene dígitos o símbolos de control/moneda/etc.
  // Permitimos letras (\p{L}) y marcas combinantes (\p{M}), pero no números (\p{N}) ni símbolos (\p{S})
  // ni puntuación no prevista.
  // Si el entorno no soporta \p{N} o \p{S}, esto fallará; asumimos entornos modernos.
  if (/\p{N}|\p{S}/u.test(trimmed)) return false;

  // Separadores/puntuación permitida dentro de tokens:
  // - apóstrofes ASCII ' y apóstrofe tipográfico ’
  // - varios guiones y equivalentes (usamos rango para cubrir guiones tipográficos)
  // - punto medio U+00B7 (·)
  const connectiveChars = "'\u2019\u2010-\u2015\u00B7";
  const connectiveClass = "[" + connectiveChars + "]";

  // Patrones reutilizables (con flag u para unicode)
  const letters = "[\\p{L}\\p{M}]+"; // una o más letras/marcas
  const singleLetter = "[\\p{L}\\p{M}]";

  const reLettersOnly = new RegExp("^" + letters + "$", "u"); // solo letras (p. ej. "李小龍", "Maria")
  const reInitialDot = new RegExp("^" + singleLetter + "\\.$", "u"); // "J."
  const reSequenceInitials = new RegExp("^(" + singleLetter + "\\.)+$", "u"); // "J.K." o "J." o "A.B.C."
  // compuesto con guiones/apóstrofes/middle-dot: segmentos de letras separados por dichos símbolos,
  // sin permitir segmentos vacíos ni iniciar/terminar por conectores.
  const reComposite = new RegExp("^" + "[\\p{L}\\p{M}](?:[\\p{L}\\p{M}]" +
    "|(?:" + connectiveClass + "[\\p{L}\\p{M}]))*$", "u");

  // Tokenizar por espacios (uno o más espacios)
  const tokens = trimmed.split(/\s+/);

  // Requisito mínimo de "completitud":
  // - Si hay 2 o más tokens => OK (se consideran nombre + apellido u otras combinaciones)
  // - Si solo hay 1 token => sólo se acepta si es una palabra con al menos 2 letras (p. ej. nombres completos en culturas sin espacios)
  if (tokens.length === 1) {
    // Si es una secuencia de iniciales ("J.K.") no la aceptamos como único token, porque no es "completo".
    if (reSequenceInitials.test(tokens[0])) return false;
    // Aceptar si es solo letras y al menos 2 letras
    if (reLettersOnly.test(tokens[0]) && tokens[0].length >= 2) {
      return true;
    }
    // Si no cumple, no es un "nombre completo" aceptable en solitario
    return false;
  }

  // Para múltiples tokens, validar cada uno según patrones permitidos.
  for (const t of tokens) {
    if (!t || t.length === 0) return false;

    // No permitir que token empiece o termine por conectores (guion, apóstrofe, middle-dot) ni por punto.
    const firstChar = t[0];
    const lastChar = t[t.length - 1];
    if (/[\.]/.test(firstChar) || new RegExp("^" + connectiveClass).test(firstChar)) return false;
    if (/[\.]/.test(lastChar) || new RegExp(connectiveClass + "$").test(lastChar)) {
      // excepción: el token puede terminar en punto si es una inicial o una abreviatura ("St.")
      // pero no si termina en conectores.
      if (!reInitialDot.test(t) && !reSequenceInitials.test(t) && !(/\.$/.test(t) && reComposite.test(t.slice(0, -1)))) {
        return false;
      }
    }

    // Casos permitidos:
    if (reLettersOnly.test(t)) continue; // simple palabra de letras
    if (reInitialDot.test(t)) continue; // "J."
    if (reSequenceInitials.test(t)) continue; // "J.K." o "A.B."
    // compuesto con guión/apóstrofe/middle-dot, posiblemente con una única terminación en punto (abreviatura compuesta)
    if (reComposite.test(t)) continue;
    if (t.endsWith(".") && reComposite.test(t.slice(0, -1))) continue;

    // Si llega aquí, el token no es válido.
    return false;
  }

  // Todo token válido y hay al menos dos tokens => aceptamos.
  return true;
}
