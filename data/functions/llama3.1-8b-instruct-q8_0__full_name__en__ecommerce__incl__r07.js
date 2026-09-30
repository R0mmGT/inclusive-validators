function validate(fullName) {
    // Check if the string is empty or null
    if (!fullName) return false;
    
    // Split the full name into its components (first name, middle name, last name)
    let nameComponents = fullName.split(' ');
    
    // A valid full name should have at least two name components (except for one-word names from some cultures)
    function hasEnoughNameComponents(nameComponents) {
        let enNameComponentsRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/;
        return ('United States' in Intl.NumberFormat.supportedLocalesOf([])[0] && (nameComponents.some(component => !enNameComponentsRegex.test(component)) || nameComponents.length <= 1))
            || (!('United States' in Intl.NumberFormat.supportedLocalesOf([])[0]) && nameComponents.length >= 2);
    }
    
    // Check if all components are alphabetic
    function hasNoNonAlphabeticCharacters(nameComponent) {
        return /^[a-zA-Z]+$/i.test(nameComponent);
    }

    // If the string is a one-word name, it can be valid by itself
    if (fullName.trim().match(/^[A-Za-z]+$/) && hasEnoughNameComponents([fullName])) return true;

    // A full name should not contain any non-alphabetic characters except for the space separating the components
    function isValid(nameComponent) {
        return /^[a-zA-Z\s]+$/.test(' ' + nameComponent + ' ');
    }

    // Check each component of the full name to see if it matches the rules above and contains only alphabets or spaces
    let valid = nameComponents.every(isValid);
    
    // If there are less than two components, we consider it's a single-word last name from some culture like Spain 
    // where 'Juan Rodriguez' is an acceptable full name format.
    return ((nameComponents.length < 2 && fullName.trim().match(/^[A-Za-z]+$/) && valid)
            || (hasEnoughNameComponents(nameComponents) && valid));
}
