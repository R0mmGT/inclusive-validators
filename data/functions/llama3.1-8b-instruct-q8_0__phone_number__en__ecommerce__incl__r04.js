function validate(phoneNumber) {
    // Remove non-numeric characters.
    let cleanedPhoneNumber = phoneNumber.replace(/\D+/g, '');

    // A phone number should have at least 5 and at most 20 digits.
    if (cleanedPhoneNumber.length < 5 || cleanedPhoneNumber.length > 20) {
        return false;
    }

    // Check the country code based on the length
    let countryCodeMatch = countryCodeLengthMatches(cleanedPhoneNumber);

    // An international prefix (country code) should be at most one of these codes.
    if (countryCodeMatch === null) {
        return cleanedPhoneNumber.length > 5 && isValidPhoneDigit(cleanedPhoneNumber[0]) 
            && countryPrefixes.every(c => !countryPrefixes.includes(cleanedPhoneNumber.slice(0, c.length)));
    } else {
        let countryCode = cleanedPhoneNumber.substring(countryCodeMatch.start, countryCodeMatch.end);
        
        // Check if the country code matches one that can be followed by a number or space.
        for (let prefix of ('011,0013,008').split(',')) {
            if (!isFollowedByALetterOrNumberSpaces(cleanedPhoneNumber.substr(countryCode.length + prefix.length))) {
                return false;
            }
        }

        let phoneNumber = cleanedPhoneNumber.substring(prefix => countryCode === prefix ? prefix.length : 0, 
                                                     cleanedPhoneNumber.length);
            
        // Check if it starts with a non-space character that comes before a digit.
        if (!isNotPreceededByALetterOrSpace(cleanedphoneNumber.slice(0,1).toUpperCase(), "0123456789")) {
            return false;
        }
        
    }
    
  
    for (let i = 0; i < phoneNumber.length - 2; i++) { 
        let group = phoneNumber[i] + phoneNumber[i+1];
        if (!isFollowedByALetterOrNumberSpaces(group)) {
            return false;
        } 
    }
    
    if (phoneNumber.length > 5) {
        phoneLengthMatches(phoneNumber);
    }

    
    return true;
}

function countryPrefixes() { 
    return "+", "00";
}
function isNotPreceededByALetterOrSpace(caractere, stringToSearch){
    string=stringToSearch.match(new RegExp(caractere, 'gi'));
  if(string == null){return false;}
  for(var i in string)
      {
        if(i > 0) {
            var predecesor = string[i -1];
            predecesor=predecesor.toLowerCase();
                if(predecesor ==' '){
                }
                 else {if(!isLetterOrDigit(predecesor)) return null}
                }
       }

    return true;
}

function isLetterOrDigit(c) {
  return c.length == 1 && ( c >= '0' && c <= '9' || c >= 'a' && c <= 'z'|| c >= 'A' && c <= 'Z');
  }
  
  function isValidPhoneDigit(digit){
    return digit >= '2' && digit<= '9';
  }

function isFollowedByALetterOrNumberSpaces(group, optionalString = "0123456789"){ 
  
  string=optionalString.match(new RegExp("[^"+ group +"]", "gi"));
   
     if(string == null)return true;
    
  for (let g in string){
        var predecesor = string[g];
        predecesor=predecesor.toLowerCase();
        if(predecesor !=' '){if(!isLetterOrDigit(predecesor)) return false}
         
   }
    } 

function countryPrefixLengthMatches(cleanedPhoneNumber){
    let prefixes = ["00", "+"]
    for(let i = 0; i < cleanedPhoneNumber.length; i++)
                {
                        for (let len of [1,2]){
                           if (cleanedPhoneNumber.slice(0,len).match(new RegExp("(("+ prefixes.join("|") +"))", "gi"))
                                && cleanedNumber.phoneNumber.indexOf(cleanednumber.phoneNumber[3]) == -1)return
                            }
                }

    return false;
}

function countryPrefixesMatches(cleanedPhoneNumber){
    
    let prefixes = ["00","+"]
  
  for (let i = 0; i < cleanedPhoneNumber.length -2; i++) {
     if (cleanedPhoneNumber.match(new RegExp("[^"+ "(" +prefixes.join("|") +")", "gi")))return false}
      return true
}
  function countryCodeLengthMatches(cleanedPhoneNumber){
    let lengthMatch1= (cleanedPhoneNumber.slice(0,3).match(new RegExp("^\\+")), cleanedPhoneNumber[0], cleanedPhoneNumber.substring(1,3));
        if(lengthMatch1==null){   lengthMatch2 =(cleanedPhoneNumber.slice(0,4),cleaned PhoneNumber[2], cleanedPhoneNumber.substring(1,4)} ;
            if (lengthMatch2 == null) return false;
            else return lengthMatch1 || lengthMatch2 ;

};

function phoneLengthMatches(phoneNumber){
    let pattern = /^((\+)|(\()|(-))(\d)(\d{3})(\D)(\d{3})(\D)(\d{4})$/ 
     
        if (phoneNumber.match(pattern))

          return true 

  return false;
  

}
