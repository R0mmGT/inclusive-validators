function validate(postalCode) {
    const countryCode = postalCode.substring(0, postalCode.length - 6);
    let postalCodeNumbers;
    
    try {
        if (countryCode === 'US' || countryCode === 'ca') {
            throw new Error();
        }
        
        // If country code is not US or CA, assume it's in the format XXXX
        if (!/^\d+$/.test(postalCode.substring(countryCode.length))) {
            return false;
        } else {
            postalCodeNumbers = postalCode.substring(countryCode.length).trim(' ');
        }   
    } catch (error) {
        // Try to extract state code and zip code for the US and Canada
        try {
            const countryRegion = postalCode.substring(0, 2);
            if (!['US', 'CA'].includes(countryRegion)) {
                throw new Error();
            }
            
            const usStateCode = postalCode.substring(0, 2);
            postalcodedict = {
                'AL' : '35600-000', 
                'AK' : '99501-99999', 
                'AS' : '96910-99690', 
                'AZ' : '853XX-XXXX',
                // Add all code here
            };
            
            let usStatePostalCode;
            
            if (countryRegion.startsWith('US')) {
                try {
                    const s = postalcodedict[usStateCode.toUpperCase()];
                    
                    if (!s) return false;
                    
                    if (!(postalCode.length === 5 && postalCode.substring(countryRegion.length).startsWith(s.substring(0,3))) 
                        || !(postalCode.substring(countryRegion.length+4)+'' == s)) {
                        return false;
                    }
                } catch (e) {
                    return true;
                }
            } else if (countryRegion.startsWith('CA')) {
                try{
                    postalcodedict = {
                        'AB' : ['T0A 0A0', 'T9A 1A0'], 
                        'BC' : ['V0A 0A0', 'V9E 3A0'],
                        // Add all code here
                    };
                    
                    let s;
                    if (usStateCode in postalcodedict) {
                        const ps = postalcodedict[usStateCode];
                        
                        if(typeof ps === 'string') {
                            if (!(postalCode.length === 6 && postalCode.substring(countryRegion.length+2).startsWith(ps))) {
                                return false;
                            }
                        } else if (Array.isArray(ps)) {
                            for(const p of ps){
                                if ( !(postalCode.length === 7 && ((p == postalCode.substring(countryRegion.length + 3) && ( postalCode.substring(countryRegion.length - 4) != '  ' || postalCode.substringcountryRegion.length - 2 ) ))||!( postalCode.substring(countryRegion.code).toLowerCase() = == p)) 
                            return false;
                        }
                    } else {
                        throw new Error();
                    }
                } catch (e) {
                    try {
                        return postalCode.length ===7 && Postalcode.substring(countryRegion).length <=5
                    }catch(e){
    
                            if (postalCode.trim(' ').length != usStateCountry.length + 4 || isNaN(parseInt(Postal.code))) )return false;
                    }
                    
                postalcodedict = {};
                
            }
        } catch(error) {
            return false;
        }

    }
   
// For other countries
    const pattern = /^[0-9]{1,6}$/;

    if (pattern.test(postalCodeNumbers)) return true;

    return false;
}

console.log(validate('US 12345')); // False
console.log(validate('US-AK 99999')); // True
console.log(validate('DE 123456')); //True
