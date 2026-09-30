function validate(phoneString) {
  // Eliminar espacios en blanco al principio y al final
  const trimmed = phoneString.trim();
  
  // Verificar si la cadena está vacía después del trim
  if (!trimmed) return false;
  
  // Patrones de teléfono válidos
  const patterns = [
    /^\+34\s?\d{9}$/,           // +34 seguido de 9 dígitos (opcional espacio)
    /^0034\s?\d{9}$/,           // 0034 seguido de 9 dígitos (opcional espacio)
    /^[6789]\d{8}$/,            // 9 dígitos empezando por 6,7,8 o 9
    /^\d{3}\s\d{3}\s\d{3}$/,    // 3 grupos de 3 dígitos separados por espacios
    /^\d{3}-\d{3}-\d{3}$/       // 3 grupos de 3 dígitos separados por guiones
  ];
  
  // Verificar si coincide con alguno de los patrones
  return patterns.some(pattern => pattern.test(trimmed));
}
