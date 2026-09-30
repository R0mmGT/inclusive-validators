function validate(name) {
  // Valida que `name` sea un nombre completo plausible para personas de cualquier cultura.
  // Reglas principales:
  // - Debe ser una cadena no vacía tras hacer trim.
  // - Permite cualquier letra Unicode (\p{L}) y marcas diacríticas (\p{M}).
  // - Permite apóstrofes (ASCII ' y U+2019), guiones medios, puntos y punto medio (·) dentro de los tokens.
  // - Cada "token" (palabra de nombre) debe comenzar con una letra y no puede empezar/terminar en separadores
  //   salvo un punto final (para iniciales o abreviaturas).
  // - Tokens separados por uno o más espacios.
  // - Longitud máxima razonable para evitar entradas absurdas.
  //
  // Esta validación es deliberadamente flexible (acepta monónimos, iniciales, conectores como O', hyphenated names, scripts no latinos, etc.)
  // pero evita cosas claramente inválidas (solo signos, símbolos sin letras, etc.).
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;
  if (s.length > 200) return false; // límite práctico razonable

  // Token:
  // - Comienza con una letra Unicode: \p{L}
  // - Puede llevar marcas diacríticas: \p{M}
  // - Permite segmentos interiores formados por un separador seguido de otra letra:
  //     separadores admitidos: apostrofe ASCII ('), apostrophe Unicode (’ U+2019), guion (-), punto (.), punto medio (· U+00B7)
  // - Puede terminar opcionalmente en un punto (para iniciales o abreviaturas)
  //
  // Ejemplos válidos: "María", "O'Neill", "Jean-Luc", "J. R. R. Tolkien", "李", "Nguyễn Thị", "D.ª", "Al·Bhed"
  const token = "\\p{L}[\\p{L}\\p{M}]*((['\u2019\\-\\u00B7\\.]\\p{L}[\\p{L}\\p{M}]*)*)\\.?";
  const fullRe = new RegExp("^" + token + "(\\s+" + token + ")*$", "u");

  return fullRe.test(s);
}
