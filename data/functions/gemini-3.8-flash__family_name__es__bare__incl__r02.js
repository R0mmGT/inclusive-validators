function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Permite apellidos de 1 a 100 caracteres.
  // Admite letras de cualquier alfabeto del mundo (\p{L}) y marcas de combinación diacrítica (\p{M}).
  // Permite apóstrofes (' y ’), guiones (-) y espacios como separadores internos válidos,
  // evitando que estén al inicio, al final o de forma consecutiva.
  const regex = /^[\p{L}\p{M}]+(?:[-'’\s][\p{L}\p{M}]+)*$/u;

  return name.length >= 1 && name.length <= 100 && regex.test(name);
}
