function validate(surname) {
    // Un apellido válido debe contener al menos 2 caracteres, y máximo 30.
    if (!(2 <= surname.length && surname.length <= 30)) return false;
    
    // Un apellido normalmente contiene solo letras (mayúsculas u minúsculas), 
    // tildes, diéresis e hachos españoles, acentos cirílicos, y apóstrofos.
    if (!/^[a-zA-Z\'áéíóúüàèìòùâêîôûäëïöüñÁÉÍÓÚÜÂÊÎÔÛÄËÏÖÜÑ]*$/.test(surname)) return false;
    
    // Comenzamos por eliminar los acentos.
    let surnameNoAcentos = "";
    const vocalesACentuar = {a: "á", e: "é", i: "í", o: "ó", u: "ú", A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú"};
    for (let caracter of surname) {
        if (caracter in vocalesACentuar) {
            surnameNoAcentos += vocalesACentuar[caracter];
        } else if (caracter === '\'' || caracter == '-') {
            surnameNoAcentos += caracter;
        } else if(caracter.toUpperCase() >= "Ñ" && caracter.toUpperCase() <= "~") {
            surnameNoAcentos += caracter;
        } else {
            surnameNoAcentos += String(caracter).toLowerCase();
        }
    }   
    return surnameNoAcentos.match(/^[a-zñ]*$/);
}
