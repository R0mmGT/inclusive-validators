function validate(str) {
    let allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '1',"2","3","4","5","6","7","8","9",'-',' ', ',', '.', ':'];
    for (let char of str) {
      if (!allowedChars.includes(char.toLowerCase())) {
          return false;
      }
  }
  let max = Number(str.split(/[0-9]/).filter(x => x !== '').map(x => x.length).max());
  for (let part of str.split(/[^0-9]+/)) {
    if (part === '') continue;
    let length = part.replace(/[-,.\s:]/g, '').length;
      if (length > max) return false;
  }
  return true;
}

console.log(validate("123   Main Street"));  
console.log(validate("123 Main Street"));
console.log(validate("Main Street")); 
console.log(validate("123 Abc Xyz..."));
