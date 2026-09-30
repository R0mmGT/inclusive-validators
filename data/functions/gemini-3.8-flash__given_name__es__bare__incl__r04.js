function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Comprobar longitud y evitar espacios residuales al inicio o final
  if (name.length === 0 || name.length > 100 || name.trim() !== name) {
    return false;
  }

  // Soporta cualquier sistema de escritura (\p{L}) y marcas diacríticas/vocálicas (\p{M}).
  // Permite apóstrofes iniciales/finales (ej. transliteraciones u 'okina) y separadores
  // comunes entre palabras (espacio, guion, apóstrofe y puntos medios culturales como '·' o '・').
  const nameRegex = /^[’']?[\p{L}\p{M}]+(?:['’·・ -][\p{L}\p{M}]+)*[’']?$/u;

  return nameRegex.test(name);
}
