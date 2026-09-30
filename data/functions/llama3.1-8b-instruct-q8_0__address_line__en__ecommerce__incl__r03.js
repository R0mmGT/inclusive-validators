function validate(str) {
    let streetAddressRules = [
        // The address should contain numeric characters (one or more)
        new RegExp("\\d"),
        
        // And at least one of either alphanumeric characters, spaces, dots, commas, parentheses, or hyphens.
        new RegExp("[a-zA-Z0-9\\s\\.\\,\\(\\)\\-]+")
    ];
    
    let address = str.trim();
    
    if(address !== '' && address.match(streetAddressRules[0]) != null && 
       (address.length <= 500 || address.split('\n').length > 1)){
        return true;
    }
    else{
        return false;
    }
}
