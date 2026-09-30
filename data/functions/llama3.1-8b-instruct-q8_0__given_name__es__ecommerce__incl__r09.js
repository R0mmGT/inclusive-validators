function validate(fullName) {
    // El nombre debe tener al menos una letra
    if (!/^[a-zA-Z]+$/.test(fullName.trim())) {
        return false;
    }
    
    // Divide el nombre por letras mayúsculas 
    let names = fullName.split(' ');
    if (names.length < 2 || names.length > 3) {
        return false; // La longitud válida del nombre es entre 5 y 14 caracteres.
    } else {
        for (let i of names) {
            if (i.length > 10) {
                return false;
            }
        }
    }

    let count = 0;
    for (let i of fullName) {
        
        // Si la letra no es una vocal, suma un alimento a cada nombre del apellido
        if ("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ".includes(i)) {
            count++;
        }
    }

    let nombres = fullName.split(" ");
    for (let i of nombres) {
       if("/^[a-zA-Z]+$/.test(i)&&i.length<3&&count<=2"){
           return false; 
       } else {
           continue;
       }
       
    }
    return true;

}

console.log(validate('JuanPablo')); // false
console.log(validate('JosePabloGuillermo'));//false

