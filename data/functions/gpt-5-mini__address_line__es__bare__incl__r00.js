// validate: comprueba si una cadena puede ser una línea de dirección postal (calle) razonable
// Diseñada para ser lo más internacional posible usando propiedades Unicode (sin librerías externas).
function validate(address) {
  if (typeof address !== 'string') return false;

  // Normalizar y recortar
  const addr = address.trim();
  if (addr.length === 0) return false;

  // Longitud razonable (muchas direcciones encajan en este rango; ajustar si es necesario)
  if (addr.length < 2 || addr.length > 256) return false;

  // Rechaza caracteres de control u otros caracteres no imprimibles
  if (/[\p{C}]/u.test(addr)) return false;

  // Debe contener al menos una letra o número (acepta alfabetos no latinos)
  if (!/[\p{L}\p{N}]/u.test(addr)) return false;

  // Permitir únicamente caracteres: letras, números, marcas (acentos combinantes), puntuación y espacios
  // Esto acepta caracteres usados comúnmente en direcciones internacionales (ñ, ç, 〒, №, º, etc.)
  if (!/^[\p{L}\p{N}\p{M}\p{P}\p{Zs}]+$/u.test(addr)) return false;

  // Rechaza URL's o correos incrustados (no pertenecen a una línea de calle)
  const lower = addr.toLowerCase();
  if (lower.includes('http://') || lower.includes('https://') || lower.includes('www.') || addr.includes('@')) {
    return false;
  }

  // Evitar secuencias largas de un mismo carácter no alfanumérico (spam/errores como "-----" o "....")
  let prev = null;
  let run = 0;
  for (const ch of addr) {
    const isAlnum = /\p{L}|\p{N}/u.test(ch);
    if (!isAlnum) {
      if (ch === prev) {
        run++;
      } else {
        prev = ch;
        run = 1;
      }
      if (run > 3) return false; // más de 3 repeticiones consecutivas del mismo símbolo
    } else {
      prev = null;
      run = 0;
    }
  }

  // Limitar tokens individuales demasiado largos (evita entradas concatenadas sin separadores)
  const tokens = addr.split(/\s+/);
  for (const t of tokens) {
    if (t.length > 80) return false;
  }

  // Evitar cadenas que sean solo números con muchos dígitos (p. ej. una tarjeta u otro identificador)
  // Si es exclusivamente dígitos y tiene más de 6 cifras, lo rechazamos (las líneas de calle puramente numéricas muy largas son raras)
  if (/^\p{N}+$/u.test(addr) && addr.replace(/\s+/g, '').length > 6) return false;

  // Pasadas todas las comprobaciones, aceptamos como una línea de dirección razonable
  return true;
}
