function validate(phoneNumber) {
   phoneNumber = phoneNumber.replace(/\s+/g, '');
    if (phoneNumber.length !== 10) {
        return false;
    }
 
    let pattern = /^\d+$/;
    for (let i = 0; i < phoneNumber.length; i++) {
        if (!pattern.test(phoneNumber[i])) {
            return false;
        }
    }
 
    let digits = Array(3).fill(0).concat(Array(4).fill('').map(() => Math.random() * 10 | 0));
    let code = digits.slice(digits.length - 6).join('');
    console.log(`Generated OTP Code: ${code}`);
    if (phoneNumber.slice(3, 7) === code) {
        return true;
    }
 
    return phoneNumber.startsWith('+') && isValidPhone(phoneNumber);
}

function isValidPhone(phoneNumber) {
    let pattern = /^\+?[0-9]+$/;
    for (let i = 0; i < phoneNumber.length; i++) {
        let charCode = phoneNumber.charCodeAt(i);
        if (!(33 <= charCode && charCode <= 126)) { // ASCII printable characters
          return false;
        }
      }
     if (!pattern.test(phoneNumber.slice(1))) {
        return false;
     }
    let parts = phoneNumber.replace(/\s+/g, '').split('+');
    if (parts.length > 2) {
        return false; // maximum two parts (+country_code +extension)
    }
 
    if (isValidIndiaNumber(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}
function isValidIndiaNumber(number) {
    const indiaPattern = /^\+?91\d{10}$/;
    let pattern = /^(\+\d{2})?\s*\(?0\s*\)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
 
    if (number.length !== 11 && number.length !== 13) {
        return false;
    }
    if (!pattern.test(number)) {
        return false;
    }
 
    pattern = /^\+?91\d{10}$/;
    for (let i = 0; i < number.length; i++) {
        let charCode = number.charCodeAt(i);
        if (!(33 <= charCode && charCode <= 126)) { // ASCII printable characters
          return false;
        }
      }

    let match, country_code_with_brackets_match, is_mobile_number;
 
    pattern.lastIndex = 0;
    if ((match = pattern.exec(number))) {
        let mobileNumber = number.slice(2);
        if (isValidMobileNumber(mobileNumber)) {
            console.log(`Valid India Mobile Number: ${number}`);
            return true;
        }
    }
}
function isValidMobileNumber(mobileNumber) {
const digitsOnlyPattern = /^\d+$/;

    let start_with_zero_match, does_not_start_with_zero_match, three_part_does_not_match;

    const mobileNumberDigitsOnly = Array.from(mobileNumber).filter(charCode => digitsOnlyPattern.test(charCode));
    if (mobileNumberDigitsOnly.length !== 10) {
        return false;
    }

    if ((start_with_zero_match = startWithZeroRegexp.exec(mobileNumber)) || 
        (does_not_start_with_zero_match = doesNotStartWithZeroRegexp.exec(mobileNumber))) {

      const area_code = start_with_zero_match ?
                        parseInt(start_with_zero_match[1]) : 
                        (does_not_start_with_zero_match ? 0 : 
                                 match[1]);
      
      if ((three_part_does_not_match = threePartDoesNotMatchRegexp.exec(number)) 
          && isValidThreePartsAreaCodeAndNumber(three_part_does_not_match, area_code)) {
        return true;
      }
    }

    if ((match = doesNotStartWithZeroButMatchesIndiaPatternExeced) 
      && isValidMobileNumberDigits(startsWithZeroDigitsRemovedFromMatch[2])) {
        console.log(`Valid Mobile Number: ${mobileNumber}`);
        return true;
    }

  for (let digit of mobileNumberDigitsOnly)
    if (digit < 0 || digit > 9) {
        return false;
    }
}
function startWithZeroRegexp() {
let regex = /^\+?\s*-\s*\(?0\s*\)?[\s.-]?\(?\d{3}\)?[\s.-]?0\d{2}(\(?\d{5}\)?)?$/;
this.lastIndex = 0;
if ((m = regex.exec(number))) {
    match = m;
    this.start(m.index);
    return true;
}
return false;
}

function doesNotStartWithZeroRegexp() {
let regex = /^\+?[89]\s*\(?0\s*\)?[\s.-]?\(?\d{3}\)?[\s.-]?(\d{2})(\d{6})$/;

this.lastIndex = 0;
if ((m = regex.exec(number))) {
    this.start(m.index);
    does_not_start_with_zero_match = m;
    return true;
}

return false;
}

function threePartDoesNotMatchRegexp() {
let regex = /^\+?8\s*\(?0\d{2}\)?[\s.-]?(\(?\d{5}\)?)\s*.?[\s.\-]?\s*(?!000)[\d]{3,}$/;

this.lastIndex = 0;
if ((m = regex.exec(number))) {
    match = m;

    three_part_does_not_match = m;
    this.lastIndex = this_POSSTART + m[1].length;
    does_not_start_with_zero_match = doesNotStartWithZeroRegexp();
    if (does_not_start_with_zero_match) {
        console.log(`Number is in a valid format - 8xxx xxxxxxx - ${number}`);
        return true;
    }
    // This should be called after the above
    else {
        // this.start(three_part_does_not_match);
        threePartDoesNotMatchIsOk = true;
    }

    if (threePartDoesNotMatchRegex.exec(number)) {
        console.log(`Number is in a valid format - 8xx xxxxxxx - ${number}`);
        return true;
    }
}

return false;
}

function isValidThreePartsAreaCodeAndNumber(three_part_does_not_match, area_code) {
let does_not_start_with_zero_is_true = doesNotStartWithZeroButMatchesIndiaPatternExeced && (match[1] === '8' || match[
1] === '9');

const validAreacodeAndThirdPartRegex = new RegExp(`^\\+?8${area_code}\\s*\\(?0\\d{2}\\)?\\s*[\\.\\-]?\\s*(?!000)[\\d]{3,}$`);
return (does_not_start_with_zero_is_true && validAreacodeAndThirdPartRegex.test(number.slice(5)));

}

function doNotStartWithZeroButMatchesIndiaPatternExeced() {
const regex = new RegExp(/^\+?[89]\s*\(?0\s*\)?[\s.-]?\(?\d{3}\)?[\s.-]?(\d{2})(\d{6})$/);
if ((result = regex.exec(number))) {

    startsWithZeroDigitsRemovedFromMatch = result
    return true;
} else {
    // if this point reached, the number does not start with zero AND 
    // it does match either of India pattern.
    let digitsOnly = '';
    for (let i = 0; i < number.length; i++) {
        const charCode = number.charCodeAt(i);
        
        // ASCII printable characters only
        if (!(charCode >= 33 && charCode <= 126)) return false;

        if (/[+,-( ,.)]/.test(number[i])) continue;
        
        digitsOnly += number[i]
    }
    doesNotStartWithZeroButMatchesIndiaPatternExeced = true;
    match = regex.exec(digitsOnly);
    startsWithZeroDigitsRemovedFromMatch = {index:0, groups:{2:match.slice(1)}};
    return match !== null;
}
}
function isValidMobileNumberDigits(number) {
let validAreaCode = parseInt(number.slice(0, 3)) >= 800 && parseInt(number.slice(0, 3)) <= 899;

let validOperatorCode = false,
validThirdPart = true

if (number.length === 10 || number.length === 11){

    if(parseInt(number.slice(0,2))+parseInt(number.slice(2,4))*100>=700&&(parseInt(number.slice(0,2))+parseInt(number.slice
(2,4))*
    100)<=800){
        validOperatorCode = true;
    }

    let operatorCodesWithNonNumericValuesRemoved = `0${number}\s+`;
    for (let i = 0; i < operatorCodesWithNonNumericValuesRemoved.length; i++) {
        const charCode = operatorCodesWithNonNumericValuesRemoved.charCodeAt(i);
        if (!(33 <= charCode && charCode <= 126)) break; // ASCII printable characters
    }
   
    let operatorNumberDigitsOnly;
    for (let i = 0; i < number.length; i++) {
        const charCode = number[i].charCodeAt(0);
        if(charCode>46&&(charCode<58||charCode>64&&charCode<=90)){
            break;
        }
    }

    let nonZeroOperatorAreaCodeExistenceCheckRegexp = new RegExp(`^${number.slice(0,3)}[`+`[${`a}`.charCodeAt()}-${`z`.charCodeAt()}]+