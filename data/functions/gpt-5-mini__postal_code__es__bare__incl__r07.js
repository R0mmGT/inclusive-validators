/**
 * Valida un código postal de forma amplia y multicultural.
 * - Acepta letras de cualquier alfabeto (\p{L}) y números de cualquier sistema (\p{N}).
 * - Permite espacios, guiones y barras internas (no al inicio ni al final).
 * - Rechaza secuencias repetidas de espacios/guiones/barras (ej. "A--B" o "A  B").
 * - Requiere longitud razonable (entre 2 y 12 caracteres después de trim).
 *
 * Nota: no existe una única máscara que cubra con exactitud todos los formatos
 * postales del mundo; este validador es flexible pero restrictivo con caracteres
 * extraños. Si necesitas validación por país, sería mejor emplear patrones
 * específicos por país.
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  // Normalizamos y comprobamos límites básicos.
  const s = input.trim();
  if (s.length < 2 || s.length > 12) return false;

  // Regex explicado:
  // ^                                         : inicio
  // (?!.*[\s\-\/]{2,})                        : no permitir dos o más espacios/guiones/barra consecutivos
  // (?=^[\p{L}\p{N}][\p{L}\p{N}\s\-\/]*[\p{L}\p{N}]$) : debe iniciar y terminar con letra o número
  // [\p{L}\p{N}\s\-\/]{2,12}                  : sólo letras/números/espacio/guión/barra, longitud 2-12
  // $                                         : fin
  const re = /^(?!.*[\s\-\/]{2,})(?=^[\p{L}\p{N}][\p{L}\p{N}\s\-\/]*[\p{L}\p{N}]$)[\p{L}\p{N}\s\-\/]{2,12}$/u;

  return re.test(s);
}
