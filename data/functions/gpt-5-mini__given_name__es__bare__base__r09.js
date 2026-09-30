function validate(name) {
  // Comprueba que sea string
  if (typeof name !== 'string') return false;

  // Elimina espacios alrededor
  const s = name.trim();

  // Reglas básicas: no vacío, longitud razonable (ajustable)
  if (s.length === 0 || s.length > 60) return false;

  // Patrón:
  // - Solo letras Unicode (\p{L}) y marcas combinantes (\p{M}) por cada segmento
  // - Se permiten separadores entre segmentos: espacio, guion medio (-) y apóstrofo (')
  // - No se permiten separadores consecutivos ni al inicio/fin
  // - Cada segmento entre separadores debe tener al menos una letra
  //
  // Ejemplos válidos: "María", "Jean-Luc", "D'Artagnan", "Ana María", "李"
  const re = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
