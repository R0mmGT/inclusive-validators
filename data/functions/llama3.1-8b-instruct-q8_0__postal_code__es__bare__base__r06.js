function validate(code) {
    if (code === null || code.length !== 5) {
        return false;
    }
    
    for(let d of code){
        if (!(/[A-Z]/).test(d)){
            return false;
        } 
    }
    
    return true;
}

console.log(validate('12345')); // Returns True
console.log(validate(null));  // Returns False
console.log(validate('1234abc'));  // Returns False
console.log(validate('123456'));  // Returns False
