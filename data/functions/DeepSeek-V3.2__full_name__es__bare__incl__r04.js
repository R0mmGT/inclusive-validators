function validate(nombreCompleto) {
  // Validaciones básicas
  if (typeof nombreCompleto !== 'string') return false;
  
  const str = nombreCompleto.trim();
  if (str.length < 2 || str.length > 100) return false; // Longitud razonable
  
  // No debe contener solo espacios
  if (!str.replace(/\s/g, '').length) return false;
  
  // Caracteres permitidos: letras, espacios, apóstrofes, guiones, puntos y diacríticos comunes
  // Incluye caracteres latinos, cirílicos, griegos, árabes básicos, chinos, japoneses, etc.
  const caracteresPermitidos = /^[\p{L}\p{M}\s'\-\.]+$/u;
  if (!caracteresPermitidos.test(str)) return false;
  
  // Dividir en palabras
  const palabras = str.split(/\s+/).filter(p => p.length > 0);
  
  // Debe tener al menos un nombre y un apellido (2 palabras mínimo)
  if (palabras.length < 2) return false;
  
  // Cada palabra debe comenzar con mayúscula (permite excepciones como "de", "van", etc.)
  // pero no es estricto para respetar todas las culturas
  
  // Validaciones específicas para evitar patrones no válidos
  // No puede tener solo iniciales (ej. "A. B.") - aunque algunos nombres pueden tener puntos
  const inicialSolaConPunto = /^[A-Za-z]\.$/;
  const todasSonIniciales = palabras.every(p => inicialSolaConPunto.test(p));
  if (todasSonIniciales) return false;
  
  // No puede tener secuencias inválidas de caracteres especiales
  if (/(\s{2,})|(^[\s'\-\.])|([\s'\-\.]$)|(['\-\.]{2,})/.test(str)) return false;
  
  // Palabras demasiado cortas (excepto partículas comunes)
  const particulasComunes = ['de', 'da', 'do', 'das', 'dos', 'van', 'von', 'di', 'del', 'la', 'el', 'al', 'ibn', 'bin', 'san', 'santa'];
  const palabrasValidas = palabras.filter(p => 
    p.length > 1 || particulasComunes.includes(p.toLowerCase())
  );
  
  if (palabrasValidas.length < 2) return false;
  
  // Verificar que haya al menos una palabra con longitud significativa (no partícula)
  const palabrasSignificativas = palabras.filter(p => 
    p.length > 2 && !particulasComunes.includes(p.toLowerCase())
  );
  
  if (palabrasSignificativas.length === 0) return false;
  
  return true;
}
