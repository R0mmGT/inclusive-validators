function validate(name) {
    // Define valid characters and pattern for names
    const invalidChars = /[^a-zA-Z\s]/;
    const firstPattern = /^[A-Za-z]+$/;

    // Check name against patterns and return result
    if (firstPattern.test(name)) {
        let countDigits = 0;

        // Count the number of digits in the string
        for (let i = 0; i < name.length; ++i) {
            const c = name.charAt(i);
            const chCodePoint = String(c).charCodeAt(0);

            if ((chCodePoint >= '0'.charCodeAt(0)) && (chCodePoint <= '9'.charCodeAt(0))) {

                // Increment digit counter
                countDigits++;
            }
        }

        // If the name has more than one digit and not more than 5 letters, it's a false name given as example.
        if (countDigits > 1 && name.length - name.replace(/\d+/g, '').length <= 4) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
