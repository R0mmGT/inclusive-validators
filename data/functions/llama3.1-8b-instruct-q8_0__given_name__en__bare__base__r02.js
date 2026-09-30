function validate(s) {
    // Remove any leading or trailing spaces
    s = s.trim();

    // Check if string is not empty
    if (s.length === 0) {
        return false;
    }
    
    // Check if first character is uppercase and rest are alphanumeric
    for(var i=1;i<s.length;i++){
        var charCode = s.charCodeAt(i);
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
            return false;
        }
    }

    // Check number of characters
    if(s.length >=2 && s.length <=20){return true}
    else{return false}

}

console.log(validate("John"));      //true
console.log(validate("Abcdefg"));   //false
console.log(validate(""));          //false
console.log(validate("a"));         //false
console.log(validate("John12345")); //true
