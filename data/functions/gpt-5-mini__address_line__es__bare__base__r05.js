function validate(line) {
  // Debe ser string
  if (typeof line !== 'string') return false;
  const s = line.trim();

  // Longitud razonable
  if (s.length < 3 || s.length > 100) return false;

  // Caracteres permitidos (incluye acentos y símbolos habituales de direcciones)
  const allowed = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9#ºª°&.,\/\-\s()]+$/;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra (nombre de calle)
  if (!/[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]/.test(s)) return false;

  // Debe contener número (número de puerta) o "s/n" (sin número)
  const hasNumber = /\d/.test(s);
  const hasSN = /\bS\s*\/\s*N\b/i.test(s); // admite S/N, s/n, S / N, etc.
  if (!hasNumber && !hasSN) return false;

  // No empezar ni terminar con puntuación típica
  if (/^[.,\/\-\#ºª°&]/.test(s) || /[.,\/\-\#ºª°&]$/.test(s)) return false;

  // No permitir dos símbolos de puntuación consecutivos (ej: //, .., ,-, etc.)
  if (/[.,\/\-\#ºª°&()]{2,}/.test(s.replace(/\s+/g, ''))) return false;

  // Evitar secuencias de muchos espacios en blanco
  if (/\s{3,}/.test(s)) return false;

  // Reglas comunes satisfechas -> considerar válida
  return true;
}
