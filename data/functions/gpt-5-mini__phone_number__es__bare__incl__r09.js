/**
 * validate(phone: string) => boolean
 *
 * Valida de forma práctica y razonablemente inclusiva números de teléfono
 * usados en todo el mundo sin librerías externas.
 *
 * Estrategia:
 *  - Acepta números en formato E.164 (ej. +34123456789).
 *  - Acepta prefijos internacionales comunes (00, 011) seguidos del código país + número.
 *  - Acepta números nacionales escritos con separadores comunes (espacios, guiones, puntos, paréntesis).
 *  - Permite extensiones comunes (ext, ext., extension, x, #, ;ext=) al final y las ignora para la validación.
 *  - Comprueba que, tras normalizar, la parte principal contenga solo dígitos y tenga una longitud razonable:
 *      - Para números con código internacional (con + o con prefijo 00/011): entre 7 y 15 dígitos (E.164).
 *      - Para números nacionales sin prefijo internacional: entre 2 y 15 dígitos (incluye números cortos/emergencia).
 *  - Rechaza códigos de país que comiencen por 0 (no válidos en E.164).
 *
 * Nota: No existe una validación perfecta sin conocer el país concreto, este enfoque busca equilibrio entre
 * inclusividad y restricciones prácticas (basadas en E.164).
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  // 1) Normalizar entrada básica
  let s = input.trim();

  // Eliminar esquema 'tel:' si existe
  s = s.replace(/^\s*tel:/i, '').trim();

  // 2) Quitar una extensión al final si existe (ext, ext., extension, x, #, ;ext=)
  //    Se considera que la extensión va al final de la cadena.
  s = s.replace(/\s*(?:;ext=|ext(?:ension)?\.?|x|#)\s*[:\s.-]*\d+$/i, '').trim();

  // 3) Eliminar separadores comunes: espacios, guiones, puntos y paréntesis
  s = s.replace(/[\s\-().]/g, '');

  if (s.length === 0) return false;

  // 4) Casos con '+' (E.164)
  if (/^\+/.test(s)) {
    const digits = s.slice(1);
    if (!/^\d+$/.test(digits)) return false;
    // País no debe comenzar por 0 y longitud E.164 entre 7 y 15
    if (digits.length < 7 || digits.length > 15) return false;
    if (/^0/.test(digits)) return false;
    return true;
  }

  // 5) Casos con prefijo internacional 00 o 011
  if (/^(00|011)/.test(s)) {
    const digits = s.replace(/^(00|011)/, '');
    if (!/^\d+$/.test(digits)) return false;
    if (digits.length < 7 || digits.length > 15) return false;
    if (/^0/.test(digits)) return false;
    return true;
  }

  // 6) Números nacionales (solo dígitos tras normalizar)
  if (!/^\d+$/.test(s)) return false;

  // Permitir números cortos (p. ej. emergencias) y números nacionales normales.
  // Límite superior acorde con E.164 (no más de 15 dígitos en la parte significativa).
  if (s.length < 2 || s.length > 15) return false;

  return true;
}
