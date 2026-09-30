function validate(personalId) {
    let isDigitsOnly = /^[0-9]+$/.test(personalId);
    
    if (isDigitsOnly) {
        for (let i = 0; i < personalId.length; i++) {
            let charCode = personalId.charCodeAt(i);
            
            if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90)) {} 
            else {
                return false;
            }
        }
    }

    const lastNamesWithAccent = [
        "Müller", "Sørensen"
    ];

    if (!isDigitsOnly && !lastNamesWithAccent.includes(personalId.toUpperCase())) {
        let regexLastname = /[^a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝÿ\-\s]/g;
        
        let match = regexLastname.test(personalId);

        if (match) {
            return false;
        }
    }

    const countrySpecificRules = [
        {
            "country": "France",
            "lastNamesBefore1971" : ["Dupont", "Durand"],
            "lengthMinMax" : [2, 30]
        },
        {
            "country": "Portugal",
            "firstLastnamesPre1970" : ["Araújo", "Pires", "Silva"],
            "lengthMinMax" : [3, 25]  
        }
    ];

    if (countrySpecificRules.some(countryItem => personalId.toUpperCase().startsWith(countryItem.firstLastnamesPre1970)) && !personalId.toUpperCase().startsWith('SILVA')) {
      return false; 
    }

    const lengthMin = 2;
    const lengthMax = 50;

    let isLengthOk = (personalId.length >= lengthMin && personalId.length <= lengthMax);
    
    if (!isDigitsOnly) {
        return isLengthOk
    }
    else {
        
        for (let i = 0; i < personalId.length; i++) {
            let charCode = personalId.charCodeAt(i);

             if ((charCode >= 48 && charCode <= 57)) {} 
              else {
                return false;
              }
          }

    return isLengthOk
    }
}

// Test cases:
console.log(validate("MÜLLER")); // true
console.log(validate("SØRENSEN")); // true
console.log(validate("!@#$%^&*()")); // false
console.log(validate("Hello World")); // false
console.log(validate("123456789")); // false
