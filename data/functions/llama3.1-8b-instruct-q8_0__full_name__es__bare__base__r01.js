function validate(name) {
    if (typeof name !== 'string') {
        return false;
    }

    const surnameRegex = /^[A-Z][a-z]+ [A-Z][a-z]*$/i;
    const forenameRegex = /^[A-Z][a-z]*(?:'[A-Z][a-z]*)?$/i;

    let surnameParts = name.split(' ');
    
    if (surnameParts.length !== 2) {
        return false;
    }

    const surname = surnameParts[0];
    const forenames = surnameParts[1];

    return surnameRegex.test(surname) && Array.from(forenames).every((forename, index, array) => forename.match(forenameRegex));
}

console.log(validate('John Smith'));  // true
console.log(validate('JON SMITH'));   // false (no hay inicial en mayúsculas)
console.log(validate('Smith John'));  // no vale porque el apellido está antes del nombre
console.log(validate('a'));           // false (menos de 2 partes o parte no válida; o una palabra vacía).
