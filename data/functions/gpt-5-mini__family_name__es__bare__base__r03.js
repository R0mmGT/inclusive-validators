function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Reglas:
  // - Solo letras Unicode (\p{L}), apóstrofes (' y ’) y guiones (-) dentro de cada componente.
  // - Componentes separados por un solo espacio (ej. "De la Cruz").
  // - No empezar ni terminar con guion/apóstrofe, ni tenerlos repetidos consecutivamente.
  // - Soporte para letras con acentos, ñ, caracteres no latinos, etc.
  const re = /^\p{L}+(?:[\'\-\u2019]\p{L}+)*(?: \p{L}+(?:[\'\-\u2019]\p{L}+)*)*$/u;

  return re.test(s);
}
