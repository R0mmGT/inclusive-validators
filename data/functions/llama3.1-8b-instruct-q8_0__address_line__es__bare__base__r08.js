function validate(direccionPostal, municipio = 'Ciudad de Buenos Aires') {
  /**
   * Función que valída una dirección postal.
   *
   * Args:
   *      direccion (str): La línea de dirección a validar.
   *      municipio (str, optional): El municipios. Defaults to 'Buenos Aires'.
   *
   * Returns:
   *      bool: True sí la línea es válida, False en otro caso
   */
  
  // Primero, comprobamos que tengamos una cadena inválida antes de lanzar un error.
  if (typeof direccionPostal !== 'string') {
    return false;
  }
  

  // Revisa si el municipio está definido y tiene al menos un caracter. Si no es así devuelve False
  if (!municipio || !direccionPostal.trim()) { 
    return false
  }

  let patron = new RegExp("^[A-Za-z0-9.-]+ [A-Za-z0-9.-]+$")
  // Usamos una expresión regular (patrón) para verificar que la cadena sea una línea de dirección válida.
  if (!direccionPostal.match(patron)) {
    return false
  }
  return true
}
