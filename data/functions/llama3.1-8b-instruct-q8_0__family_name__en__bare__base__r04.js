function validate(lastName) {
    if (typeof lastName !== 'string') return false;
    let hasAtLeastOneVowel = false, hasAtLeastOneDigit = false;
    let regex = /[a-zA-Z]/g;
    for (let c of lastName) {
        if(/[aeiouAEIOU]/.test(c)) {  // check if character is a vowel
            hasAtLeastOneVowel = true;  
        }
        else {
            if (!isNaN(parseInt(c))) {  // check if character doesn't pass isNaN test, so it's a digit
                hasAtLeastOneDigit = true;
            } else {
                return false;   // Return False immediately when encounter any character that is neither a letter nor a digit
            }
        }
    }
  
    // If the string starts with a capital and the rest of letters are lowercase or vice versa
    if(( lastName[0].match(/[A-Z]/) && !new RegExp("[A-Z]").test(lastName.slice(1)))  || (lastName[0].match(/[a-z]/) && !new RegExp("[a-z]").test(lastName.slice(1)))){
        return false;
    }
    
    // If string is empty, return False
    if(lastName.length === 0){
        return false;  
    } else {
    	return hasAtLeastOneVowel && hasAtLeastOneDigit;
	}
}

console.log(validate("Smith"));  // true
console.log(validate("smitty"));  // false
console.log(validate("SMith2"));  // true
console.log(validate("2"));  // false
console.log(validate("1a"));  // false
console.log(validate("") );  // false
