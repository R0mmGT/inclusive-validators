function validate(address) {
    // We define the regular expression pattern to match US-style street addresses
    let usPattern = /^(?!.*[^\w\s]{2,})(?:\d+(?:-\d+)*)?(?:Apt|Ste|mflr)?\.?\s*(?:Street|St\.|Ave.?|Av?\.?|Boulevard|Blvd|Drive|Dr\.?|Road|Rd\.?|Lane|Ln\.?|Way|Wy\.?)\s*\d+/i;

    // We define the regular expression pattern to match non-US-style street addresses
    let internationalPattern = /^\s*[a-zA-Z\s]+(?:\.\.?\,\d{1,}\.)*\s*/;

    try {
        address = address.trim();  // Remove leading and trailing whitespace
        address = address.toLowerCase().replace(/[^a-z0-9\s\.]/g, ');');  // Normalize to lowercase

        // Perform the two regular expression checks
        return usPattern.test(address) || internationalPattern.test(address);
    } catch (e) {
        console.log('Error validating street address: ' + e.toString());
        return false;
    }
}
