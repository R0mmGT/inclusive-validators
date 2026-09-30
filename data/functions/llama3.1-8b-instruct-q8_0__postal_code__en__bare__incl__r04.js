function validate(code) {
    // Check if input string has between 1 to 20 characters when including spaces.
    if (!(code.length >= 1 && code.length <= 20 && (/[^\w\s]/g).test(code))) {
        return false;
    }

    // Check if each segment of the code is either a letter or a number
    let segments = code.split(/\s+/);
    for (let segment of segments) {
        if ((/[^[A-Za-z0-9]]/g).test(segment)) {
            return false;
        }
    }

    try {
        var postcodeObject = {};
        segments.forEach(function(segment){
            if(segLengthMap.hasOwnProperty(segment.length)){
                postcodeObject[segLengthMap[segment.length].name] = segment.toUpperCase() ;
            } else {
                throw new Error();
            }
        });

        // Check if required segments of the code are present
        const validNameList = [];
        for (let name in segLengthMap) {
            validNameList.push(segLengthMap[name].name);
        }

        let requiredSegmentsExist = true;
        for (let segment of validNameList) {
            if (!(segment !== 'postcode' && postcodeObject.hasOwnProperty(segment))) {
                requiredSegmentsExist = false;  
                break;
            }
        }

        let result = (requiredSegmentsExist && !/\d/.test(postcodeObject['postcode']));

        return result;

    } catch (e){
        // We just let the exception bubble up and it will be handled by defaulting to a valid code.
    }
}

// Maps segment lengths to possible segment names
var segLengthMap = {
    1: {length: 1, name: 'sector'},
2: {length: 2, name: 'postal town'},
3: {length: 3, name: 'postal sector'},
4: {length: 4, name: 'post code district'},
6: {length: 6, name: 'outer post code letter section'},
10: {length: 10, name: 'outer post code number suffix'}
};

console.log(validate('G0P 8TQ')); // Should print true
console.log(validate('11111-1')); // Should print false
