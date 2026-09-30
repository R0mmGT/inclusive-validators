function validate(name) {
  // Debe ser un string
  if (typeof name !== 'string') return false;

  // Trim y límites razonables de longitud (ajustable)
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Caracteres permitidos: letras de cualquier alfabeto (\p{L}), marcas combinantes (\p{M}),
  // espacios, guion medio, apóstrofo ASCII, apóstrofo tipográfico ’, y punto y medio (·) y punto (.)
  // Usamos el flag 'u' para escapes Unicode y \p{…}
  const allowed = /^[\p{L}\p{M}\s\-\u0027\u2019\u00B7\.]+$/u;
  if (!allowed.test(name)) return false;

  // No permitir dos separadores consecutivos (espacio, guion, apóstrofos, middle dot)
  // (Excluimos el punto de esta comprobación porque el punto puede ser parte de una abreviatura como "St. John")
  if (/[ \-\u0027\u2019\u00B7]{2,}/u.test(name)) return false;

  // Debe comenzar con una letra
  if (!/^\p{L}/u.test(name)) return false;

  // Debe terminar en letra o en un punto (ej. "St.")
  if (!/[\p{L}\.]$/u.test(name)) return false;

  // Dividimos en "tokens" por los separadores típicos (espacio, guion, apóstrofos, middle dot)
  const tokens = name.split(/[ \-\u0027\u2019\u00B7]+/u);

  // Cada token debe:
  // - empezar por una letra,
  // - contener solo letras y marcas combinantes,
  // - opcionalmente poder acabar con un único punto (abreviatura).
  const tokenCore = /^\p{L}[\p{L}\p{M}]*$/u;
  for (const tok of tokens) {
    if (tok.length === 0) return false;

    // Si contiene un punto, debe ser único y estar al final
    const dotCount = (tok.match(/\./g) || []).length;
    if (dotCount > 1) return false;
    if (dotCount === 1) {
      if (!tok.endsWith('.')) return false;
      const core = tok.slice(0, -1);
      if (core.length === 0) return false;
      if (!tokenCore.test(core)) return false;
    } else {
      if (!tokenCore.test(tok)) return false;
    }
  }

  // Asegurar que hay al menos una letra (por seguridad)
  if (!/\p{L}/u.test(name)) return false;

  return true;
}
