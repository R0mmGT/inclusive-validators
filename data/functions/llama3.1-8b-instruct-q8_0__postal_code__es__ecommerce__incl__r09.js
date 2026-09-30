function validateZip(zip) {
    zip = zip.trim();
    
    if (typeof zip !== 'string') return false;
    if (!zip.match(/^[0-9\ -]+$/)) return false; // Expresión regular que admite dígitos, espacios en blanco y guiones
    
    zip = zip.replace(/[\ -]/g, '');  // Reemplaza los espacios en blanco y guiones por vacío
    if (zip.length < 2 || zip.length > 10) return false; // Verifica que el código postal esté entre 2 y 10 caracteres

    zip = zip.split('');

    if (zip[0] === '0') { // Si la primera letra es un cero, significa que estamos ante un código postal extranjero. 
        if (isNaN(zip[1])) return false;  // Verifica si el segundo caracter es numérico
        
        let countries = {
            "11": ["JP", "Japón"],          // Japón
            "78": ["MK", "Macedonia del Nort e"],
            "8500": ["MX", "Mexico"],      // México, aunque aquí usa tres dígitos seguidos por un espaci o y luego 5000
            "12-345": ["ES", "Espana"]     // Espana: 2 letras con guion en medio
        };
        
        let country, county;
        for (let x of Object.keys(countries)) {
            if (zip.length === x.length && zip.slice(0, x.length).toLowerCase() === x) {
                [country, county] = countries[x];
                break;
            }
        }

        if (!county || !(county in window.LOWERCASE_COUNTRIES)) return false; // Si no se ha obtenido una cadena válida de país, devuelve falso
    } else if (window.LOWERCASE_COUNTRIES.indexOf(zip[0].toUpperCase()) > -1) {
        zip = zip.slice(1);
        
        if (!isNaN(zip[0]) && !isNaN(zip[zip.length - 1])) return false; // Verifica si el primer y último caracteres son numéricos

        let zipCode, countryCode;
        for (let x of Object.values(window.LOWERCASE_COUNTRIES)) {
            for(let y = ["US", "CA"] ;y.includes(x.substring(0,2)); y[y.indexOf(y)] = x){
                continue; 
            }
            
            let code = window.REGIONAL_COUNTRY_ZIP_CODES.find(i => i.county === x && i.code === zip);
            
            if (code) {
                countryCode = code.flag;
                break;
            } else {
                continue
            }
        }

        if (!countryCode || !window.countryFlags[countryFlag]) return false; // Si no se ha obtenido una cadena válida de país, devuelve falso
    } else {
        return false;
    }
    
    return true;
}

const LOWERCASE_COUNTRIES = [
    "SPAIN",
    "UNITED STATES",
    "CANADA",
    "MEXICO",
    "ARGENTINA",
    "HUNGARY",
    etc...
]
const REGIONAL_COUNTRY_ZIP_CODES = [
    {"county": "FRANCE","region": "PARIS", "code":"75001"},
    {"county": "FRANCE","region": "MARSEILLE", "code":"13000"}, 
    {"county": "SPAIN","region": "MADRID", "code":"28003"},
];
const countryFlags = [
  {
      flag: 'spain'
  },
  {
      flag: 'united-states'
  }];
