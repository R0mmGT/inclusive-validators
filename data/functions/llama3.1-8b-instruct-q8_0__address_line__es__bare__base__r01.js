function validate(s) {
    let s = s.toUpperCase();
    if (!s.includes('\n')) return false;
    
    let partes = s.split('\n');
    
    if (partes[0].split(' ').length > 1 && typeof partes[0] === 'string') {
        return true;
    } else {
        return false;
    }
}

console.log(validate("123 main street\nlondon")) // => true
console.log(validate("123 main")) // false
