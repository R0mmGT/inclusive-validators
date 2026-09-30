function validate(s) {
    // Non-empty string
    if (!s.length || s.length > 50) return false;
    
    // No leading or trailing whitespace
    if (s[0].trim() !== s[0] || s[s.length-1].trim() !== s[s.length-1]) return false;
    
    // Only contain valid characters
    for (let c of s) {
        let codePoint = c.charCodeAt(0);
        if (!(33 <= codePoint && codePoint <= 126)) return false; 
        else if ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.indexOf(c.toLowerCase()) === -1)
            {
                let accent = c.normalize('NFD');
                for (let ch of accent) {
                    let inRange = 'a' <= ch && ch <= 'z';
                    if (!inRange) return false;
                }
            
            } 
    }

    // No excessive punctuation
    let s_copy = s.trim();
    return (s_copy.match(/\d+/g) || []).length <= s_copy.length / 10 &&
           (s_copy.search(/[a-zA-Z]/) !== -1) &&
           !(/^[0-9\s]+$/.test(s)) && 
           !(/[<>@#$%^&*()\-[\]{};:'",./?_\|]+/g.test(s));
}

console.log(validate("")); // false
console.log(validate(" ")); // false
console.log(validate(",.")); // false
console.log(validate("*" )); // false
console.log(validate("^_@")); // false
console.log(validate("1234567890")); //false
console.log(validate("abcdefghijklmnopqrstuvwxyz")); //true
console.log(validate("ABCDEFGHIJKLMNOPQRSTUVWXYZ")); // true
console.log(validate("#@!%$&*()_-`~;:{[]}?'\".,/<>|\\"));//false
