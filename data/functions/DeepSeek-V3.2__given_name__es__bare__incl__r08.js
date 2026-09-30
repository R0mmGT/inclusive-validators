function validate(name) {
  // Validación básica
  if (typeof name !== 'string') return false;
  
  const trimmed = name.trim();
  if (trimmed.length === 0) return false;
  
  // Patrones de validación
  const patterns = {
    // Caracteres latinos básicos con diacríticos comunes
    latin: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ'\-\.\s]+$/,
    // Caracteres cirílicos
    cyrillic: /^[А-Яа-яЁёЂђЄєІіЇїЈјЉљЊњЋћЎўѢѣѲѳѴѵҐґЅѕІіꙈꙉꙊꙋꙌꙍꙎꙏꙐꙑꙒꙓꙔꙕꙖꙗꙘꙙꙚꙛꙜꙝꙞꙟꙠꙡꙢꙣꙤꙥꙦꙧꙨꙩꙪꙫꙬꙭꙮѠѡѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵҀҁ'\-\.\s]+$/,
    // Caracteres griegos
    greek: /^[Α-Ωα-ωΆΈΉΊΌΎΏάέήίΰόύώΐΪΫϊϋΐΰ'\-\.\s]+$/,
    // Caracteres armenios
    armenian: /^[Ա-Ֆա-ֆՙ'\-\.\s]+$/,
    // Caracteres georgianos
    georgian: /^[ა-ჿ'\-\.\s]+$/,
    // Caracteres hebreos
    hebrew: /^[\u0590-\u05FF'\-\.\s]+$/,
    // Caracteres árabes
    arabic: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF'\-\.\s]+$/,
    // Caracteres devanagari (hindi, sánscrito, etc.)
    devanagari: /^[\u0900-\u097F'\-\.\s]+$/,
    // Caracteres bengalíes
    bengali: /^[\u0980-\u09FF'\-\.\s]+$/,
    // Caracteres chinos/japoneses/coreanos (CJK)
    cjk: /^[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF'\-\.\s]+$/,
    // Caracteres tailandeses
    thai: /^[\u0E00-\u0E7F'\-\.\s]+$/,
    // Caracteres etíopes
    ethiopic: /^[\u1200-\u137F'\-\.\s]+$/,
    // Caracteres birmanos
    myanmar: /^[\u1000-\u109F'\-\.\s]+$/
  };
  
  // Caracteres especiales permitidos (apóstrofes, guiones, puntos, espacios)
  const specialChars = /^['\-\.\s]+$/;
  
  // Verificar que no sea solo caracteres especiales
  if (specialChars.test(trimmed)) return false;
  
  // Verificar que coincida con al menos un patrón de escritura
  const matchesPattern = Object.values(patterns).some(pattern => pattern.test(trimmed));
  if (!matchesPattern) return false;
  
  // Verificaciones adicionales
  // 1. No debe comenzar o terminar con caracteres especiales (excepto apóstrofe para nombres como O'Connor)
  if (/^[-\s\.]|[-\.\s]$/.test(trimmed)) return false;
  
  // 2. No debe tener secuencias inválidas de caracteres especiales
  if (/[-\.]{2,}/.test(trimmed)) return false; // No dos guiones o puntos seguidos
  if (/\s{2,}/.test(trimmed)) return false; // No dos espacios seguidos
  
  // 3. Longitud razonable para un nombre (1-50 caracteres)
  if (trimmed.length < 1 || trimmed.length > 50) return false;
  
  // 4. Debe contener al menos una letra (no solo números u otros caracteres)
  const hasLetter = /[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿА-Яа-яЁёΑ-Ωα-ω]/.test(trimmed);
  const hasNonLatinLetter = Object.values(patterns)
    .slice(1) // Excluir patrón latino
    .some(pattern => {
      const noSpecial = pattern.toString().replace(/['\-\\.\s]/g, '');
      return new RegExp(noSpecial.slice(2, -2)).test(trimmed.replace(/['\-\\.\s]/g, ''));
    });
  
  if (!hasLetter && !hasNonLatinLetter) return false;
  
  // 5. Validar uso de apóstrofes (solo uno por nombre y en posición válida)
  const apostropheCount = (trimmed.match(/'/g) || []).length;
  if (apostropheCount > 2) return false; // Permitir hasta dos apóstrofes (ej: O'Connor, D'Angelo)
  
  return true;
}
