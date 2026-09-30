function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 60) return false; // evita nombres vacíos o excesivamente largos

  // Permite letras Unicode (incluye diacríticos y scripts no latinos), y marcas combinantes.
  // Permite separadores comunes en nombres: espacio, guion, apóstrofe recto y apóstrofe tipográfico, punto medio (·).
  // No permite dígitos ni otros signos; no permite separadores consecutivos ni al inicio/final.
  const re = /^[\p{L}\p{M}]+(?:[ '\-’·][\p{L}\p{M}]+)*$/u;
  return re.test(name);
}
