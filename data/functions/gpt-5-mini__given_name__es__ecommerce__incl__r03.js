// Valida un nombre de pila (primer nombre) de forma permisiva y compatible con Unicode.
// Reglas principales:
// - Debe ser un string, no vacío tras trim y con longitud razonable (1..100).
// - Permite cualquier letra Unicode (\p{L}) y marcas combinantes (\p{M}).
// - Permite espacios de separación (\p{Zs}), apóstrofes comunes (', U+02BC, U+2019),
//   el punto (.) y guiones/dashes (incluye \p{Pd}).
// - No permite que comience o termine con signos de puntuación/espacios: debe empezar y acabar en letra/marca.
// - No permite secuencias de separadores/puntuación (por ejemplo "--", "  ", ".'").
// - Normaliza a NFC si está disponible para tratar combinaciones de forma consistente.
function validate(name) {
  if (typeof name !== 'string') return false;
  // Normalizar para tratar correctamente las marcas combinantes
  if (typeof name.normalize === 'function') {
    name = name.normalize('NFC');
  }
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Patrón Unicode:
  // - (?!. *[separadores]{2,}) evita separadores consecutivos.
  // - ^\p{L}(?:[...]*[\p{L}\p{M}])?$ exige que empiece por letra y termine por letra/marca.
  // Separadores permitidos dentro: \p{Zs} (espacios), apóstrofes (' U+0027, U+02BC, U+2019), middle dot (·),
  // punto (.), guiones (\p{Pd} y '-').
  const pattern = /^(?!.*(?:['\u02BC\u2019·.\-\p{Pd}\p{Zs}]{2,}))(?:\p{L}(?:[\p{L}\p{M}\p{Zs}'\u02BC\u2019·.\-\p{Pd}]*[\p{L}\p{M}])?)$/u;

  return pattern.test(name);
}
