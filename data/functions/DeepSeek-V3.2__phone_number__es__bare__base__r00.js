function validate(phone) {
  // Eliminar espacios al principio y al final
  phone = phone.trim();
  
  // Patrón que acepta:
  // - Números internacionales con + al inicio
  // - Números con o sin paréntesis alrededor del código de área
  // - Separadores: espacios, guiones, puntos
  // - Código de área de 3 dígitos (opcional para formato internacional)
  // - Número principal de 7 dígitos
  const pattern = /^(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  
  return pattern.test(phone);
}
