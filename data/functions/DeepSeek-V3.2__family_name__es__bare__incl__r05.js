function validate(apellido) {
  // Verificar que el argumento sea un string
  if (typeof apellido !== 'string') {
    return false;
  }
  
  // Eliminar espacios en blanco al inicio y final
  const trimmed = apellido.trim();
  
  // Un apellido no puede estar vacío después de trim
  if (trimmed.length === 0) {
    return false;
  }
  
  // Longitud mínima y máxima razonable para un apellido
  // Consideramos desde 1 carácter (como "O" en coreano) hasta 50 caracteres
  if (trimmed.length < 1 || trimmed.length > 50) {
    return false;
  }
  
  // Patrones de validación internacional
  
  // 1. Caracteres alfabéticos básicos (incluyendo acentos y diacríticos europeos)
  const patronEuropeo = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
  
  // 2. Caracteres cirílicos (ruso, búlgaro, serbio, etc.)
  const patronCirilico = /^[\u0400-\u04FF]+$/;
  
  // 3. Caracteres griegos
  const patronGriego = /^[\u0370-\u03FF\u1F00-\u1FFF]+$/;
  
  // 4. Caracteres armenios
  const patronArmenio = /^[\u0530-\u058F]+$/;
  
  // 5. Caracteres hebreos
  const patronHebreo = /^[\u0590-\u05FF]+$/;
  
  // 6. Caracteres árabes (y persa/urdu que extienden el rango básico)
  const patronArabe = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/;
  
  // 7. Caracteres devanagari (hindi, sánscrito, etc.)
  const patronDevanagari = /^[\u0900-\u097F]+$/;
  
  // 8. Caracteres bengalíes
  const patronBengali = /^[\u0980-\u09FF]+$/;
  
  // 9. Caracteres chinos (hanzi) - común en apellidos chinos
  const patronChino = /^[\u4E00-\u9FFF]+$/;
  
  // 10. Caracteres japoneses (hiragana, katakana, kanji)
  const patronJapones = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/;
  
  // 11. Caracteres coreanos (hangul)
  const patronCoreano = /^[\uAC00-\uD7AF\u1100-\u11FF]+$/;
  
  // 12. Caracteres tailandeses
  const patronTailandes = /^[\u0E00-\u0E7F]+$/;
  
  // 13. Caracteres georgianos
  const patronGeorgiano = /^[\u10A0-\u10FF]+$/;
  
  // 14. Caracteres etíopes (amhárico)
  const patronEtiope = /^[\u1200-\u137F]+$/;
  
  // 15. Apellidos con guiones, espacios o apóstrofes (ej: O'Brien, García-Márquez, Van Der Berg)
  const patronConSeparadores = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  
  // 16. Apellidos compuestos (como "De la Cruz", "Van der Waals")
  // Permitimos espacios, guiones y apóstrofes para apellidos compuestos
  const patronCompuesto = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  
  // Verificar contra cada patrón individual
  const patronesIndividuales = [
    patronEuropeo,
    patronCirilico,
    patronGriego,
    patronArmenio,
    patronHebreo,
    patronArabe,
    patronDevanagari,
    patronBengali,
    patronChino,
    patronJapones,
    patronCoreano,
    patronTailandes,
    patronGeorgiano,
    patronEtiope
  ];
  
  // Primero verificar si el apellido completo coincide con algún patrón individual
  for (const patron of patronesIndividuales) {
    if (patron.test(trimmed)) {
      return true;
    }
  }
  
  // Si no coincide con patrones individuales, verificar patrones con separadores
  // pero solo para alfabetos latinos (los más comunes con separadores)
  if (patronConSeparadores.test(trimmed) || patronCompuesto.test(trimmed)) {
    return true;
  }
  
  // Caso especial: apellidos de un solo carácter (como "O" en coreano)
  // ya cubierto por los patrones individuales
  
  // Casos especiales adicionales:
  
  // Apellidos con números (raro pero existe en algunas culturas)
  // Por ejemplo, algunos apellidos nativos americanos o apellidos con números romanos
  const patronConNumerosRomanos = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: (I|II|III|IV|V|VI|VII|VIII|IX|X))?$/;
  if (patronConNumerosRomanos.test(trimmed)) {
    return true;
  }
  
  // Apellidos con partículas (De, Van, Von, etc.) que pueden tener espacios
  const partículas = ['de', 'van', 'von', 'der', 'den', 'ter', 'ten', 'di', 'da', 'del', 'della', 'dos', 'das', 'do', 'du', 'le', 'la', 'los', 'las', 'el', 'al', 'bin', 'ibn', 'ben', 'mac', 'mc', 'fitz'];
  const palabras = trimmed.toLowerCase().split(/[ -]+/);
  
  // Verificar que al menos una palabra no sea solo una partícula
  const soloParticulas = palabras.every(palabra => partículas.includes(palabra));
  if (soloParticulas) {
    return false;
  }
  
  // Verificación final: debe contener al menos una letra (de cualquier alfabeto)
  // y solo puede contener caracteres permitidos
  const caracteresPermitidos = /^[\p{L}\p{M} '-]+$/u;
  
  // Verificar que no tenga caracteres prohibidos (números, símbolos especiales)
  // excepto los ya permitidos en patrones anteriores
  if (!caracteresPermitidos.test(trimmed)) {
    return false;
  }
  
  // Verificar que no tenga secuencias inválidas de caracteres
  // (como múltiples espacios, guiones o apóstrofes seguidos)
  const secuenciasInvalidas = /  |--|''|^-|-$|^'|'$|^-|-$/;
  if (secuenciasInvalidas.test(trimmed)) {
    return false;
  }
  
  // Si pasa todas las validaciones, es probablemente un apellido válido
  return true;
}
