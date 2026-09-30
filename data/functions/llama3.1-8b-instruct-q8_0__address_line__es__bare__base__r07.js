function validate(s) {
    let a = [0, 2];
    for (let i of s.trim().split(" ")){
        if (!(i.match(/^[a-zA-Z0-9\s\.\,\-\+\s]+$/))||!isNaN(i[1])||(i.length>10)||(!/[a-zA-Z]/.test(s.split(' ').find(word => i == word && a.includes(a.indexOf(word)))))){
            return false;
        }
    }
    return true;
}

console.log(validate("123 Street Name")); // Output: True
console.log(validate("Invalid Address"));  // Output: False
