function validate(name) {
  // Devuelve true si `name` es un apellido válido según reglas inclusivas y Unicode-aware.
  if (typeof name !== 'string') return false;

  // Normalizar espacios alrededor
  const s = name.trim();
  if (s.length === 0) return false;
  if (s.length > 100) return false; // límite razonable para evitar inputs maliciosos

  // Explicación breve de la expresión:
  // - ^\p{L}                        : debe comenzar con una letra (cualquier alfabeto Unicode)
  // - [\p{L}\p{M}\u200C\u200D]*     : pueden seguir letras, marcas diacríticas y ZWNJ/ZWJ
  // - (?: [separador] \p{L} ... )*  : opcionalmente grupos separados por un único separador,
  //   donde "separador" puede ser espacio Unicode, guiones, apóstrofes, punto medio, punto, etc.
  // - $                              : fin de cadena
  //
  // Esto permite apellidos como "O'Neill", "Smith-Jones", "van der Sar", "Łódź",
  // "毛", "김", "Νικολάου", "Díaz", "Nuñez", "Chōrō·suke", y acepta marcas y joiners Unicode.
  const re = /^\p{L}[\p{L}\p{M}\u200C\u200D]*(?:[\p{Zs}\p{Pd}'\u2019\u02BC\u00B7\.]\p{L}[\p{L}\p{M}\u200C\u200D]*)*$/u;

  return re.test(s);
}
