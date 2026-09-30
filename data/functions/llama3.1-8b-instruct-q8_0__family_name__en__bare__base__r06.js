function validate(inputString) {
    if (typeof inputString !== 'string') return false;
    
    let letters = "abcdefghijklmnopqrstuvwxyzáàâãéèêíïóôõúüÁÀÂÃÉÈÊÍÏÓÔÕÚÜŕ";
    
    for (let char of inputString) {
        let match = false;
        for (let letter of letters) {
            if (char.toLowerCase() === letter) {
                match = true;
                break;
            }
        }
        
        if (!match || isNaN(parseInt(char))) return false;
    }

    let firstNameLength, lastNameLength;

    if (inputString.indexOf(" ") > 0)
        [firstNameLength, lastNameLength] = inputString.split(" ").map(x => x.length);
    else
        [lastNameLength] = [inputString.length];

    return lastNameLength >= 2 && lastNameLength <= 50;
}

console.log(validate('Doe')); // TRUE
console.log(validate('John Doe')); // FALSE (since first name is more than 1 character)
console.log(validate('A')); // FALSE (since last name should have a length of at least 2)
