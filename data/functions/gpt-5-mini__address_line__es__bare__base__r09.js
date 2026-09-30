function validate(line) {
  // Devuelve true si `line` parece una línea de dirección postal (calle) válida.
  if (typeof line !== 'string') return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 200) return false; // tamaño razonable
  if (/[\x00-\x1F]/.test(s)) return false; // sin caracteres de control
  if (!/\p{L}/u.test(s)) return false; // debe contener al menos una letra

  // Caracteres permitidos: letras (Unicode), números, espacios y algunos signos habituales en direcciones
  if (!/^[\p{L}\p{N}\s\.,#\/\-ºª°'’\(\)]*$/u.test(s)) return false;

  // Lista de tipos de vía comunes (español e inglés, abreviaturas incluidas)
  const types = [
    'calle', 'cll', 'c', 'avenida', 'av', 'avda', 'paseo', 'paseo', 'pº', 'paseo', 'boulevard',
    'bulevar', 'bvd', 'plaza', 'carrera', 'cra', 'cr', 'camino', 'carretera', 'callejón', 'callejon',
    'travesía', 'travesia', 'trv', 'ronda', 'sector', 'parque', 'parque', 'street', 'st', 'road',
    'rd', 'lane', 'ln', 'way', 'drive', 'dr', 'via', 'vía'
  ];

  // Crear regex para buscar tipo de vía como palabra completa (case-insensitive, Unicode)
  const typeRegex = new RegExp('\\b(' + types.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b', 'iu');
  const hasType = typeRegex.test(s);

  // Detectar número de portal (1-6 dígitos) o "s/n" (sin número)
  const hasNumber = /\b\d{1,6}\b/.test(s) || /\b(s\/n|sn)\b/i.test(s);

  // Requerir al menos un tipo de vía o un número (muchas direcciones incluyen uno de los dos)
  if (!hasType && !hasNumber) return false;

  // Rechazar cadenas que sean solo números y signos
  if (/^[\d\.\,\s#\/\-]+$/.test(s)) return false;

  // Evitar secuencias muy largas de signos no alfanuméricos (p. ej. "////" o "----")
  if (/[^\p{L}\p{N}\s]{3,}/u.test(s)) return false;

  // Validación adicional básica de orden: si hay número y aparece, suele estar al principio o cerca del final,
  // pero no exigir demasiado estricto para no rechazar formatos válidos internacionales.
  // Aceptamos la dirección si pasa las comprobaciones anteriores.
  return true;
}
