function validate(address) {
    let common = ["Street", "Avenue", "Boulevard", "Drive", "Lane", "Road"];
    let special = ["NE", "NW", "SE", "SW", "N", "S", "E", "W"];
    address = address.trim();
    if (address != "" && 
        address.match(/^[a-zA-Z0-9\s,.-]+$/) != null &&
        address.findIndex(char => common.includes(char)) != -1 &&
        address.indexOf(",") < 2 &&
        parseInt(address.split(",")[0]) <= 9999 &&
        (address.split(',')[address.length-1].match(/[a-zA-Z]/) != null || special.some(x => address.toLowerCase().endsWith(x)))
    ) {
        return true;
    }
    return false;
}

// Test the function
console.log(validate("123 Main St")); // Should print True
console.log(validate("456 Broadway, NE")); // Should print True
console.log(validate("789 Invalid Address")); // Should print False
