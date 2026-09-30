function validate(str) {
  var patron = new RegExp("^(?:Aven?i?a|Buena?venida|Calle|Caminada|Borde|rue?)\\s?[0-9]+$|^([A-Za-zñÑÁÉÍÓÚ])+( [A-Za-zñÑÁÉÍÓÚ])+,[0-9A-Z]+");
  return patron.test(str);
}

console.log(validate("123 Main St")); // true
console.log(validate("456 Broadway")); // true
console.log(validate("789 Oak Dr"));//true
console.log(validate("100 Park Ave."));//true

console.log(validate("Invalid Address")); // false
