function validate(postalCode) {
    let codes = ['USA', 'CAN'];

    if (!/^[0-9]{5}$/.test(postalCode)) return false;
    
    postalCode = postalCode.slice(1); // Remove the country code
    
    for (let i = 3; i < postalCode.length; i++) {
        const charCode = parseInt(postalCode[i].charCodeAt());
        
        if ((45 <= charCode && charCode <= 57) || (65 <= charCode && charCode <= 90)) continue;
        else return false;
    }
    
    return true;
}

console.log(validate('+1XXX12')); // Returns True
console.log(validate('USA123456')); 
