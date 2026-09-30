function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length < 2 || s.length > 60) return false;

  // Permite letras Unicode (incluye acentos y ñ), marcas diacríticas,
  // y separadores comúnmente usados en apellidos: espacio, guion y apóstrofo (ASCII y ’).
  // Cada "palabra" debe empezar por una letra y no se permiten separadores consecutivos
  const re = /^\p{L}[\p{L}\p{M}]*([ \u0027\u2019\-]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(s);
}
