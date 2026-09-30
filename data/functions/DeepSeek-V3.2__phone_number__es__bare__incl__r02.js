function validate(phoneString) {
    // Validar entrada
    if (typeof phoneString !== 'string') return false;
    
    const trimmed = phoneString.trim();
    if (trimmed.length < 4 || trimmed.length > 20) return false;
    
    // Normalizar: quitar espacios, guiones, puntos, paréntesis
    const normalized = trimmed.replace(/[\s\-\.\(\)]/g, '');
    
    // Verificar que solo contenga dígitos y posiblemente un signo + al inicio
    if (!/^\+?\d+$/.test(normalized)) return false;
    
    // Verificar que tenga al menos 4 dígitos después del posible +
    const digitsOnly = normalized.replace('+', '');
    if (digitsOnly.length < 4) return false;
    
    // Verificar que si hay +, tenga al menos 7 dígitos totales (código país + número local)
    if (normalized.startsWith('+') && digitsOnly.length < 7) return false;
    
    // Validaciones específicas por región basadas en códigos conocidos
    if (normalized.startsWith('+')) {
        // Extraer código de país (1-3 dígitos después del +)
        const countryCodeMatch = normalized.match(/^\+\d{1,3}/);
        if (!countryCodeMatch) return false;
        
        const countryCode = countryCodeMatch[0].slice(1);
        const numberPart = digitsOnly.slice(countryCode.length);
        
        // Validaciones para códigos de país específicos
        const countryValidations = {
            '1': () => numberPart.length === 10, // Norteamérica
            '7': () => numberPart.length === 10, // Rusia, Kazajistán
            '20': () => numberPart.length >= 8 && numberPart.length <= 10, // Egipto
            '27': () => numberPart.length === 9, // Sudáfrica
            '30': () => numberPart.length === 10, // Grecia
            '31': () => numberPart.length === 9, // Países Bajos
            '32': () => numberPart.length === 9, // Bélgica
            '33': () => numberPart.length === 9, // Francia
            '34': () => numberPart.length === 9, // España
            '39': () => numberPart.length >= 9 && numberPart.length <= 11, // Italia
            '40': () => numberPart.length === 9, // Rumania
            '41': () => numberPart.length === 9, // Suiza
            '43': () => numberPart.length >= 7 && numberPart.length <= 13, // Austria
            '44': () => numberPart.length === 10, // Reino Unido
            '45': () => numberPart.length === 8, // Dinamarca
            '46': () => numberPart.length >= 7 && numberPart.length <= 9, // Suecia
            '47': () => numberPart.length === 8, // Noruega
            '48': () => numberPart.length === 9, // Polonia
            '49': () => numberPart.length >= 6 && numberPart.length <= 13, // Alemania
            '51': () => numberPart.length === 9, // Perú
            '52': () => numberPart.length === 10, // México
            '54': () => numberPart.length === 10, // Argentina
            '55': () => numberPart.length >= 10 && numberPart.length <= 11, // Brasil
            '56': () => numberPart.length === 9, // Chile
            '57': () => numberPart.length === 10, // Colombia
            '58': () => numberPart.length === 10, // Venezuela
            '60': () => numberPart.length >= 8 && numberPart.length <= 10, // Malasia
            '61': () => numberPart.length === 9, // Australia
            '62': () => numberPart.length >= 8 && numberPart.length <= 12, // Indonesia
            '63': () => numberPart.length === 10, // Filipinas
            '64': () => numberPart.length >= 8 && numberPart.length <= 10, // Nueva Zelanda
            '65': () => numberPart.length === 8, // Singapur
            '66': () => numberPart.length >= 8 && numberPart.length <= 9, // Tailandia
            '81': () => numberPart.length === 10, // Japón
            '82': () => numberPart.length >= 8 && numberPart.length <= 11, // Corea del Sur
            '84': () => numberPart.length >= 9 && numberPart.length <= 11, // Vietnam
            '86': () => numberPart.length >= 10 && numberPart.length <= 12, // China
            '90': () => numberPart.length === 10, // Turquía
            '91': () => numberPart.length === 10, // India
            '92': () => numberPart.length === 10, // Pakistán
            '93': () => numberPart.length === 9, // Afganistán
            '94': () => numberPart.length === 9, // Sri Lanka
            '95': () => numberPart.length >= 8 && numberPart.length <= 10, // Myanmar
            '98': () => numberPart.length === 10, // Irán
            '212': () => numberPart.length >= 8 && numberPart.length <= 9, // Marruecos
            '213': () => numberPart.length === 9, // Argelia
            '216': () => numberPart.length === 8, // Túnez
            '218': () => numberPart.length === 9, // Libia
            '220': () => numberPart.length === 7, // Gambia
            '221': () => numberPart.length === 9, // Senegal
            '222': () => numberPart.length === 7, // Mauritania
            '223': () => numberPart.length === 8, // Malí
            '224': () => numberPart.length === 8, // Guinea
            '225': () => numberPart.length === 8, // Costa de Marfil
            '226': () => numberPart.length === 8, // Burkina Faso
            '227': () => numberPart.length === 8, // Níger
            '228': () => numberPart.length === 8, // Togo
            '229': () => numberPart.length === 8, // Benín
            '230': () => numberPart.length === 7, // Mauricio
            '231': () => numberPart.length === 7, // Liberia
            '232': () => numberPart.length === 8, // Sierra Leona
            '233': () => numberPart.length === 9, // Ghana
            '234': () => numberPart.length === 10, // Nigeria
            '235': () => numberPart.length === 8, // Chad
            '236': () => numberPart.length === 8, // República Centroafricana
            '237': () => numberPart.length === 9, // Camerún
            '238': () => numberPart.length === 7, // Cabo Verde
            '239': () => numberPart.length === 7, // Santo Tomé y Príncipe
            '240': () => numberPart.length === 9, // Guinea Ecuatorial
            '241': () => numberPart.length === 7, // Gabón
            '242': () => numberPart.length === 9, // República del Congo
            '243': () => numberPart.length === 9, // República Democrática del Congo
            '244': () => numberPart.length === 9, // Angola
            '245': () => numberPart.length === 7, // Guinea-Bisáu
            '246': () => numberPart.length === 7, // Diego García
            '247': () => numberPart.length === 4, // Ascensión
            '248': () => numberPart.length === 7, // Seychelles
            '249': () => numberPart.length === 9, // Sudán
            '250': () => numberPart.length === 9, // Ruanda
            '251': () => numberPart.length === 9, // Etiopía
            '252': () => numberPart.length >= 7 && numberPart.length <= 8, // Somalia
            '253': () => numberPart.length === 8, // Yibuti
            '254': () => numberPart.length === 9, // Kenia
            '255': () => numberPart.length === 9, // Tanzania
            '256': () => numberPart.length === 9, // Uganda
            '257': () => numberPart.length === 8, // Burundi
            '258': () => numberPart.length === 8, // Mozambique
            '259': () => numberPart.length === 8, // Zanzíbar
            '260': () => numberPart.length === 9, // Zambia
            '261': () => numberPart.length === 9, // Madagascar
            '262': () => numberPart.length === 9, // Reunión
            '263': () => numberPart.length === 9, // Zimbabue
            '264': () => numberPart.length === 9, // Namibia
            '265': () => numberPart.length === 9, // Malaui
            '266': () => numberPart.length === 8, // Lesoto
            '267': () => numberPart.length === 8, // Botsuana
            '268': () => numberPart.length === 8, // Suazilandia
            '269': () => numberPart.length === 7, // Comoras
            '290': () => numberPart.length === 4, // Santa Elena
            '291': () => numberPart.length === 7, // Eritrea
            '297': () => numberPart.length === 7, // Aruba
            '298': () => numberPart.length === 6, // Islas Feroe
            '299': () => numberPart.length === 6, // Groenlandia
            '350': () => numberPart.length === 8, // Gibraltar
            '351': () => numberPart.length === 9, // Portugal
            '352': () => numberPart.length === 9, // Luxemburgo
            '353': () => numberPart.length === 9, // Irlanda
            '354': () => numberPart.length === 7, // Islandia
            '355': () => numberPart.length === 9, // Albania
            '356': () => numberPart.length === 8, // Malta
            '357': () => numberPart.length === 8, // Chipre
            '358': () => numberPart.length >= 5 && numberPart.length <= 12, // Finlandia
            '359': () => numberPart.length === 9, // Bulgaria
            '370': () => numberPart.length === 8, // Lituania
            '371': () => numberPart.length === 8, // Letonia
            '372': () => numberPart.length === 7, // Estonia
            '373': () => numberPart.length === 8, // Moldavia
            '374': () => numberPart.length === 8, // Armenia
            '375': () => numberPart.length === 9, // Bielorrusia
            '376': () => numberPart.length === 6, // Andorra
            '377': () => numberPart.length === 8, // Mónaco
            '378': () => numberPart.length === 6, // San Marino
            '379': () => numberPart.length === 10, // Ciudad del Vaticano
            '380': () => numberPart.length === 9, // Ucrania
            '381': () => numberPart.length === 9, // Serbia
            '382': () => numberPart.length === 8, // Montenegro
            '383': () => numberPart.length === 8, // Kosovo
            '385': () => numberPart.length === 8, // Croacia
            '386': () => numberPart.length === 8, // Eslovenia
            '387': () => numberPart.length === 8, // Bosnia y Herzegovina
            '389': () => numberPart.length === 8, // Macedonia del Norte
            '420': () => numberPart.length === 9, // República Checa
            '421': () => numberPart.length === 9, // Eslovaquia
            '423': () => numberPart.length === 7, // Liechtenstein
            '500': () => numberPart.length === 5, // Islas Malvinas
            '501': () => numberPart.length === 7, // Belice
            '502': () => numberPart.length === 8, // Guatemala
            '503': () => numberPart.length === 8, // El Salvador
            '504': () => numberPart.length === 8, // Honduras
            '505': () => numberPart.length === 8, // Nicaragua
            '506': () => numberPart.length === 8, // Costa Rica
            '507': () => numberPart.length === 8, // Panamá
            '508': () => numberPart.length === 6, // San Pedro y Miquelón
            '509': () => numberPart.length === 8, // Haití
            '590': () => numberPart.length === 9, // Guadalupe
            '591': () => numberPart.length === 8, // Bolivia
            '592': () => numberPart.length === 7, // Guyana
            '593': () => numberPart.length === 9, // Ecuador
            '594': () => numberPart.length === 9, // Guayana Francesa
            '595': () => numberPart.length === 9, // Paraguay
            '596': () => numberPart.length === 9, // Martinica
            '597': () => numberPart.length === 6, // Surinam
            '598': () => numberPart.length === 8, // Uruguay
            '599': () => numberPart.length === 7, // Curazao
            '670': () => numberPart.length === 7, // Timor Oriental
            '672': () => numberPart.length === 5, // Isla Norfolk
            '673': () => numberPart.length === 7, // Brunéi
            '674': () => numberPart.length === 7, // Nauru
            '675': () => numberPart.length === 8, // Papúa Nueva Guinea
            '676': () => numberPart.length === 5, // Tonga
            '677': () => numberPart.length === 5, // Islas Salomón
            '678': () => numberPart.length === 5, // Vanuatu
            '679': () => numberPart.length === 7, // Fiyi
            '680': () => numberPart.length === 7, // Palaos
            '681': () => numberPart.length === 6, // Wallis y Futuna
            '682': () => numberPart.length === 5, // Islas Cook
            '683': () => numberPart.length === 4, // Niue
            '685': () => numberPart.length === 5, // Samoa
            '686': () => numberPart.length === 5, // Kiribati
            '687': () => numberPart.length === 6, // Nueva Caledonia
            '688': () => numberPart.length === 5, // Tuvalu
            '689': () => numberPart.length === 6, // Polinesia Francesa
            '690': () => numberPart.length === 4, // Tokelau
            '691': () => numberPart.length === 7, // Micronesia
            '692': () => numberPart.length === 7, // Islas Marshall
            '850': () => numberPart.length >= 8 && numberPart.length <= 11, // Corea del Norte
            '852': () => numberPart.length === 8, // Hong Kong
            '853': () => numberPart.length === 8, // Macao
            '855': () => numberPart.length >= 8 && numberPart.length <= 9, // Camboya
            '856': () => numberPart.length >= 8 && numberPart.length <= 10, // Laos
            '880': () => numberPart.length === 10, // Bangladés
            '886': () => numberPart.length === 9, // Taiwán
            '960': () => numberPart.length === 7, // Maldivas
            '961': () => numberPart.length === 8, // Líbano
            '962': () => numberPart.length === 9, // Jordania
            '963': () => numberPart.length === 9, // Siria
            '964': () => numberPart.length === 10, // Irak
            '965': () => numberPart.length === 8, // Kuwait
            '966': () => numberPart.length === 9, // Arabia Saudita
            '967': () => numberPart.length === 9, // Yemen
            '968': () => numberPart.length === 8, // Omán
            '970': () => numberPart.length === 9, // Palestina
            '971': () => numberPart.length === 9, // Emiratos Árabes Unidos
            '972': () => numberPart.length === 9, // Israel
            '973': () => numberPart.length === 8, // Baréin
            '974': () => numberPart.length === 8, // Catar
            '975': () => numberPart.length === 8, // Bután
            '976': () => numberPart.length === 8, // Mongolia
            '977': () => numberPart.length === 10, // Nepal
            '992': () => numberPart.length === 9, // Tayikistán
            '993': () => numberPart.length === 8, // Turkmenistán
            '994': () => numberPart.length === 9, // Azerbaiyán
            '995': () => numberPart.length === 9, // Georgia
            '996': () => numberPart.length === 9, // Kirguistán
            '998': () => numberPart.length === 9, // Uzbekistán
        };
        
        // Buscar validación específica por código de país
        for (const [code, validationFn] of Object.entries(countryValidations)) {
            if (countryCode.startsWith(code)) {
                return validationFn();
            }
        }
        
        // Si no hay validación específica, requerir al menos 7 dígitos totales
        return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }
    
    // Para números sin + (números locales), requerir entre 4 y 15 dígitos
    return digitsOnly.length >= 4 && digitsOnly.length <= 15;
}
