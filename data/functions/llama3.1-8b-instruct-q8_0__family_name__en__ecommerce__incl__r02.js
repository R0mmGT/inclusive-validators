function validate(lastName) {
    // if last name is empty, it's not valid
    if (!lastName) return false;

    // try to match common formats of family names (last name)
    let regexFormats = [
        /(Mr|Mrs|Mx\.?)(\s+)?(\w+)$/, // surname like Mr John or Mrs. Doe
        /^([A-Z][a-z]*[- ]*[A-Z][a-z]*)+\s+([A-Z][a-z]*)$/, // name and last name "First Name(MN) Last Name"
        /^([A-ZÅÄÖ][a-zåäö]*)+(?:\s([A-ZÅÄÖ][a-zåäö]*))?$/i, // format of Norwegian family name or common format for a surname 
        /^[A-Z]+$/i
    ];
    
    let match = regexFormats.some(regex =>
        ((typeof Symbol !== "undefined" && Regex.prototype[Symbol.match]) || typeof Date !== "object" ? // eslint-disable-line no-useless-escape, no-duplicate-imports
        new RegExp('(?!(?:\\t|\\r|\\b)\\1)[a-zÀÁÂÃÄÅàáâãäåòÐÈÉÊËèéêëìÍîïîñòóôõÖùúûù]+')
            .test(lastName.replace(/\s/g, '')) : regex.test(lastName)
        ));
    return match;
}
