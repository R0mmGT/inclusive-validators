/**
 * Valida números de teléfono de forma práctica y permisiva para uso en formularios
 * internacionales. No pretende cubrir el 100% de los casos (para eso existe
 * libphonenumber), pero:
 * - Acepta formato internacional con + o con prefijo 00.
 * - Permite separadores comunes: espacios, guiones, paréntesis, puntos.
 * - Acepta extensiones (ext, x, #, extension) y las ignora para la validación.
 * - Normaliza dígitos de varios alfabetos (árabe, devanagari, thai, etc.)
 * - Comprueba que haya entre MIN_DIGITS y 15 dígitos (15 es el máximo E.164).
 *
 * Devuelve true si el valor parece un número de teléfono válido para registro.
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  // Rangos Unicode de dígitos usados por distintas escrituras -> mapeamos a ASCII
  const DIGIT_RANGES = [
    [0x0030, 0x0039], // ASCII 0-9
    [0x0660, 0x0669], // Arabic-Indic
    [0x06F0, 0x06F9], // Eastern Arabic-Indic
    [0x0966, 0x096F], // Devanagari
    [0x09E6, 0x09EF], // Bengali
    [0x0A66, 0x0A6F], // Gurmukhi
    [0x0AE6, 0x0AEF], // Gujarati
    [0x0B66, 0x0B6F], // Oriya
    [0x0BE6, 0x0BEF], // Tamil
    [0x0C66, 0x0C6F], // Telugu
    [0x0CE6, 0x0CEF], // Kannada
    [0x0D66, 0x0D6F], // Malayalam
    [0x0E50, 0x0E59], // Thai
    [0x0ED0, 0x0ED9], // Lao
    [0x1040, 0x1049], // Myanmar
    [0x17E0, 0x17E9]  // Khmer
  ];

  // convierte cualquier dígito Unicode conocido a su equivalente ASCII '0'..'9'
  function normalizeDigits(str) {
    let out = '';
    for (let i = 0; i < str.length; i++) {
      const cp = str.codePointAt(i);
      // Si es un surrogate pair, avanzar índice adicional (ya codePointAt lo lee)
      if (cp > 0xffff) i++;
      let converted = null;
      for (const [start, end] of DIGIT_RANGES) {
        if (cp >= start && cp <= end) {
          converted = String.fromCharCode(0x30 + (cp - start));
          break;
        }
      }
      if (converted !== null) {
        out += converted;
        continue;
      }
      // conservar símbolos útiles y separadores para procesarlos luego
      out += String.fromCodePoint(cp);
    }
    return out;
  }

  // 1) Acotar y limpiar: quitar BOM, trim y normalizar dígitos
  let s = input.replace(/^\uFEFF|\u200E|\u200F/g, '').trim();
  s = normalizeDigits(s);

  if (s.length === 0) return false;

  // 2) Separar y descartar parte de extensión si hay (ext, extension, x, # ...)
  //    Ejemplos: "555-1234 x123", " +44 20 7946 0958 ext. 123"
  const parts = s.split(/(?:\s*(?:ext\.?|extension|extn|x|#)\s*:?\s*)/i);
  s = parts[0].trim();

  if (s.length === 0) return false;

  // 3) Rechazar si contiene letras (excluyendo las usadas en marcación)
  //    Permitimos + y dígitos y separadores; si hay letras, es inválido.
  if (/[A-Za-z\u00C0-\u024F]/.test(s)) {
    // letras latinas detectadas -> muy probablemente no es un teléfono válido
    return false;
  }

  // 4) Eliminar separadores comunes
  //    Permitimos: espacios, puntos, guiones, paréntesis y caracteres Unicode de espacio.
  s = s.replace(/[\s.\-(){}\[\]\u00A0\u2000-\u200A\u202F\u205F\u3000]+/g, '');

  if (s.length === 0) return false;

  // 5) Manejar prefijo internacional alternativo '00' -> convertir a '+'
  if (s.startsWith('00')) {
    s = '+' + s.slice(2);
  }

  // 6) Validaciones formales
  // No debe haber más de un '+' y si existe sólo puede estar al inicio
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Ahora la cadena debe ser '+'?digits or only digits
  const pureDigits = s.startsWith('+') ? s.slice(1) : s;
  if (!/^\d+$/.test(pureDigits)) return false;

  // 7) Contar dígitos y aplicar límites razonables:
  // E.164 permite hasta 15 dígitos. Para evitar aceptar codes cortos tipo SMS/servicios
  // requerimos un mínimo razonable (p. ej. 6). Ajusta MIN_DIGITS si lo deseas.
  const MIN_DIGITS = 6;
  const MAX_DIGITS = 15;
  const digitCount = pureDigits.length;
  if (digitCount < MIN_DIGITS || digitCount > MAX_DIGITS) return false;

  // 8) Compruebo que el código de país no empiece por 0 (los códigos de país no comienzan con 0)
  // Si el número viene con '+', la primera cifra del country code (primer dígito) no debe ser 0.
  if (s.startsWith('+')) {
    // el country code pueden tener entre 1 y 3 dígitos; comprobamos la primera cifra
    if (pureDigits[0] === '0') return false;
  } else {
    // Si no tiene prefijo internacional, aceptamos números nacionales
    // (no hacemos validación de código de país exacta aquí)
  }

  // Si llegó hasta aquí, lo consideramos un teléfono válido para registro.
  return true;
}
