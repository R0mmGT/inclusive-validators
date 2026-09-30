function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // Trim y comprobaciones básicas
  const s = name.trim();
  if (s.length === 0) return false;

  // No se permiten dígitos
  if (/\d/.test(s)) return false;

  // No se permiten signos de puntuación excepto apostrofo, guion y espacios simples
  // (rejilla amplia de caracteres prohibidos)
  if (/[!@#$%^&*()_=+<>[\]{}|\\\/"`~?;:.,]/.test(s)) return false;

  // No espacios múltiples consecutivos
  if (/\s{2,}/.test(s)) return false;

  // Debe haber al menos dos palabras (nombre y apellido mínimo)
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false;

  // Cada parte puede contener letras Unicode y opcionalmente guiones/apóstrofos entre segmentos.
  // Ejemplos válidos: "María-José", "O'Neill", "Jean-Claude"
  const partRe = /^\p{L}+(?:['\-]\p{L}+)*$/u;

  for (const p of parts) {
    if (!partRe.test(p)) return false;

    // Contar únicamente letras en la parte; exigimos al menos 2 letras por palabra
    const lettersOnly = p.replace(/[^\p{L}]/gu, '');
    if (lettersOnly.length < 2) return false;
  }

  return true;
}
