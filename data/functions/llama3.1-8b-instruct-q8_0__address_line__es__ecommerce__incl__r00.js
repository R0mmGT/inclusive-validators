function validate(street) {
    // Define una lista de patrones de calles válidas.
    let patterns_valid_streets = [
        ^(1?[0-9][0-9]?|[2][0-4][0-9]|[24][50]) [a-zA-Z0-9 -]+,? ([a-zA-Z0-9 ,]+)$,
        ^([a-zA-Z]+) No [0-9]{0,6}(([A-Za-z]*) ?([a-zA-Z]*))^,
        ^(2-10)? W[0-9]{3}$,
        ^(3-11|12|14-15|16-20|44|45) (H|K)(ay|Yard)? [a-zA-Z , ]+$,
        ^13 ([A-Za-z ,]+)$,
        ^([2-4]|5[0-6]) [a-zA-Z]*Road$,
        ^([1-9][0-9]*) ?([A-Za-z ]+ ?[A-Za-z]*) (Drive|Square|St|Lane|Way|Crescent|Avenue|Boulevard|Rd|Gdns)$
    ];

    let street = street.trim();

    let validPatterns = patterns_valid_streets.filter(re => re.test(street));

    return validPatterns.length > 0;
}

console.log(validate('1 Main St')); // true
console.log(validate('123 Fake Street')); // true
console.log(validate('13 Fake Rd, Lane Ave')); // true
console.log(validate('abc fdkjsf dfjklasjdfjl asd')); // false
