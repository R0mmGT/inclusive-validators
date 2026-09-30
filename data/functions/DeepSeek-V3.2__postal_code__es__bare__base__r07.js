function validate(codigo) {
  // Verificar que sea string y no esté vacío
  if (typeof codigo !== 'string' || codigo.trim() === '') {
    return false;
  }
  
  const codigoTrimmed = codigo.trim();
  
  // Patrón para código postal español (5 dígitos)
  const patronEspanol = /^\d{5}$/;
  
  // Patrón para código postal argentino (4 dígitos, con o sin letra al inicio)
  const patronArgentino = /^[A-Za-z]?\d{4}$/;
  
  // Patrón para código postal mexicano (5 dígitos)
  const patronMexicano = /^\d{5}$/;
  
  // Patrón para código postal estadounidense (5 dígitos, opcionalmente seguido de guión y 4 dígitos)
  const patronEstadounidense = /^\d{5}(-\d{4})?$/;
  
  // Patrón para código postal colombiano (6 dígitos)
  const patronColombiano = /^\d{6}$/;
  
  // Patrón para código postal chileno (7 dígitos)
  const patronChileno = /^\d{7}$/;
  
  // Patrón para código postal brasileño (8 dígitos, opcionalmente con guión: 99999-999)
  const patronBrasileno = /^\d{5}-?\d{3}$/;
  
  // Patrón genérico (entre 4 y 10 caracteres alfanuméricos, con opcionales guiones o espacios)
  const patronGenerico = /^[A-Za-z0-9\s\-]{4,10}$/;
  
  // Verificar contra los patrones específicos primero
  if (patronEspanol.test(codigoTrimmed) ||
      patronArgentino.test(codigoTrimmed) ||
      patronMexicano.test(codigoTrimmed) ||
      patronEstadounidense.test(codigoTrimmed) ||
      patronColombiano.test(codigoTrimmed) ||
      patronChileno.test(codigoTrimmed) ||
      patronBrasileno.test(codigoTrimmed)) {
    return true;
  }
  
  // Si no coincide con patrones específicos, probar con el genérico
  if (patronGenerico.test(codigoTrimmed)) {
    // Verificación adicional para códigos genéricos
    const sinEspaciosGuiones = codigoTrimmed.replace(/[\s\-]/g, '');
    return sinEspaciosGuiones.length >= 4 && sinEspaciosGuiones.length <= 10;
  }
  
  return false;
}
