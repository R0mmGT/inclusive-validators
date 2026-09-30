function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;
  // Debe contener al menos dos palabras separadas por espacios simples
  if (!name.includes(' ')) return false;
  if (/\s{2,}/.test(name)) return false; // no permitir espacios consecutivos
  const parts = name.split(' ');
  if (parts.length < 2) return false;
  // Cada palabra: solo letras Unicode, pudiendo contener guiones o apóstrofes internos,
  // no empezar ni terminar con guión/apóstrofe, ni tener secuencias de ellos.
  const wordRe = /^\p{L}+(?:[\'\-]\p{L}+)*$/u;
  for (const p of parts) {
    if (!wordRe.test(p)) return false;
    // exigir al menos 2 letras por palabra (para evitar iniciales sueltas)
    const letters = p.match(/\p{L}/gu) || [];
    if (letters.length < 2) return false;
  }
  return true;
}
