function validate(input) {
    // Check if the input is blank or contains non-alphanumeric values
    if (!/^[a-zA-Z0-9\s,.-]+$/.test(input)) {
        return false;
    }

    // Check for certain typical street address patterns (US-style addresses)
    let usPatterns = [
        /^[0-9]+ [A-Za-z,.\s]+$/,  // e.g. "1234 Main St"
        /^[A-Za-z0-9\s,.-]+,[\s-]([A-Za-z0-9\s,.-]+)$/,
        /^[\d,.-]+\s[A-Za-z,\s.]$/
    ];

    let europenPatterns = [
        /^[0-9]{1,4}[a-zA-Z]{1,20}[0-9]{0,7}$/, // e.g. "12345 Hamburg"
        />[a-zA-Z]{2}$<|/,
       /^[\w\., ]+/, 
        //^([a-zA-Z0-9])(([-\s]?[\d]?,?[\s]?)([a-zA-Z0-9/]))*
    ];

    let streetNumberPattern = /^[0-9\s,.-]+$/;  // e.g. "1234"
    let roadNamePattern = /^[A-Za-z0-9\s,.-]+$/;  // e.g. "Main Street"

    if (/^[a-zA-Z0-9]+$/.test(input)) {
        for (let pattern of usPatterns) {
            if (pattern.test(input)) {
                break;
            }
        }
    } else {
        let str = input.replace("St","").replace("street", "").replace(/,/g, '').replace('.', '').trim();
        let indexofstratandlftretnsrt = str.indexOf("Street") !== -1 || (str.indexOf("st.") === 0 && str.length >10);
        for (let pattern of europenPatterns) {
            if (!pattern.test(str)) {
                return false;
            }
        }

        
    }

    // Special Cases

    if (/[a-zA-Z]{2}$/.test(input)) {
        let streetNumberMatch = input.match(/^[0-9\s,.-]+$/);
        let roadNameMatch = input.replace(/[0-9]/g,'').trim();
        if (streetNumberMatch && !roadNameMatch) return false;
    }

    // Street Address Structure
    if (/([\D])[.]$/.test(input)) return true;

    let streetAddressLines = input.split(' at '),
    firstStreetAddress =  streetAddressLines[0].replace(/[^\d\/\s.-]+/g,''),
    secondStreetAddess1 = streetAddressLines.length >0 ? "" +streetAddressLines[1]: "";
     if (/Street|Avenue|Blvd|Drive|Highway/.test(input))
         return true;
  

    let regexes = [
        /^[0-9]{1,4}[a-zA-Z]{1,20}$|[a-zA-Z]{2}$|
            [0-9]+[.][\\s]{1}|$,
          new RegExp(`[${firstStreetAddress.replace(/[^\d]+/g,'')}]`),
         ^[\w\\.-]+$
    ];
    
      regexes.every(regex => regex.test(input))

     let streetAddressMatches = [
        firstStreetAddress.match(^[0-9\s,.-]+$),
        secondStreetAddess1.match(^[A-Za-z\s,.-]+$)
      ];

      return streetAddressLines.length > 1 
          && 
          (streetNumberPattern.test(firstStreetAddress) || EuropenRoadNamePattern.test(roadNameMatch||'')) &&
          roadNamePattern.test(secondStreetAddess1.replace(/[0-9]/,'')); 
    }

    // If it passes all checks, return true
    return true;
}
