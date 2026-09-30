function validate(s) {
  let num = s.replace(/[^0-9]/g, '');
  if (num.length != 10) {
    return false;
  }
  for (let digit of num) {
    let n = parseInt(digit);
    if (!(n >= 0 && n <= 9)) {
      return false;
    }
  }
  return true;
}
