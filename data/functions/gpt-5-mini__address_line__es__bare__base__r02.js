function validate(address) {
  // Debe ser string
  if (typeof address !== 'string') return false;

  const s = address.trim();

  // Longitud razonable
  if (s.length < 3 || s.length > 120) return false;

  // No caracteres de control
  if (/[\x00-\x1F\x7F]/.test(s)) return false;

  // Solo permitir letras (unicode), números, espacios y signos comunes en direcciones
  // . , # - / ( ) : º ª ° y comillas simples/dobles no suelen usarse; se excluyen.
  const allowed = /^[\p{L}\p{N}\s\.,#\-\ºª°\/\(\):]+$/u;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra (nombre de la calle)...
  if (!/\p{L}/u.test(s)) return false;

  // ...y al menos un número (número de portal), o expresiones válidas como "s/n" o "sin número"
  if (!/\d/.test(s)) {
    const noNumberPatterns = [
      /\bS\s*\/\s*N\b/i,           // S/N o S / N
      /\bSN\b/i,                   // SN
      /\bSIN\s+NUM(ERO)?\b/i       // SIN NUM o SIN NUMERO
    ];
    if (!noNumberPatterns.some((re) => re.test(s))) return false;
  }

  // Comprobar que existe una estructura plausible: nombre + número (ej. "Calle X 12")
  // o abreviaturas antes del nombre (C/, Av., P.º) seguidas de nombre y número,
  // o número seguido de complemento (ej. "10 2ºA").
  const plausible = [
    /\p{L}+\s+\d+/u,                       // "Nombre 12"
    /(?:C\.?|C\/|CALLE|AV\.?|AVDA|P(?:\.)?O\.)\s*[\p{L}\s\.]+?\s+\d+/iu, // "C/ Alcalá 10", "Av. ... 5"
    /\d+\s*[ºª°]?\s*\p{L}*/u               // "10", "10º", "10B", "10 2ºA"
  ];
  if (!plausible.some((re) => re.test(s))) return false;

  // Evitar cadenas que sean solo puntuación o solo números sin nombre
  if (/^[\d\W_]+$/.test(s)) return false;

  return true;
}
