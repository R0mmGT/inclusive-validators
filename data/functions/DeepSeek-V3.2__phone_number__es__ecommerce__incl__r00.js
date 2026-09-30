function validate(phoneString) {
    // Si el valor no es string o está vacío, no es válido
    if (typeof phoneString !== 'string' || phoneString.trim() === '') {
        return false;
    }
    
    // Normalizar: eliminar espacios, guiones, puntos, paréntesis y el signo +
    const normalized = phoneString.replace(/[\s\-\.()\+]/g, '');
    
    // Verificar que solo contenga dígitos después de la normalización
    if (!/^\d+$/.test(normalized)) {
        return false;
    }
    
    // Longitudes mínimas y máximas típicas de números telefónicos internacionales
    // (según ITU-T E.164: mínimo 4, máximo 15 dígitos sin prefijo internacional)
    // Incluyendo prefijos de país (1-3 dígitos) + número local
    const length = normalized.length;
    if (length < 5 || length > 15) {
        return false;
    }
    
    // Validar estructura básica:
    // 1. No debe empezar con 0 (a nivel internacional, excepto en algunos formatos locales)
    // Permitimos que empiece con 0 solo si el usuario omite el código de país
    // Pero a nivel internacional normalmente se espera código de país + número
    
    // Validación adicional: países específicos con patrones conocidos
    // (esta es una muestra, no exhaustiva)
    
    // Estados Unidos/Canadá: código 1, luego 10 dígitos (total 11)
    if (/^1\d{10}$/.test(normalized)) {
        return true;
    }
    
    // Reino Unido: código 44, luego 9-10 dígitos (total 12-13)
    if (/^44\d{9,10}$/.test(normalized)) {
        return true;
    }
    
    // España: código 34, luego 9 dígitos (total 11)
    if (/^34\d{9}$/.test(normalized)) {
        return true;
    }
    
    // México: código 52, luego 10 dígitos (total 12)
    if (/^52\d{10}$/.test(normalized)) {
        return true;
    }
    
    // Argentina: código 54, luego 6-12 dígitos (total 9-15)
    if (/^54\d{6,12}$/.test(normalized)) {
        return true;
    }
    
    // Chile: código 56, luego 8-9 dígitos (total 10-11)
    if (/^56\d{8,9}$/.test(normalized)) {
        return true;
    }
    
    // Colombia: código 57, luego 10 dígitos (total 12)
    if (/^57\d{10}$/.test(normalized)) {
        return true;
    }
    
    // Patrón general para otros países:
    // - Código de país: 1-3 dígitos (1, 2 o 3 dígitos)
    // - Número local: mínimo 4, máximo 14 dígitos
    // - Total: 5-15 dígitos (como ya validamos)
    
    // Códigos de país válidos (lista parcial basada en ITU-T)
    const validCountryCodes = [
        '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44',
        '45', '46', '47', '48', '49', '51', '52', '53', '54', '55', '56', '57', '58', '60', '61',
        '62', '63', '64', '65', '66', '81', '82', '84', '86', '90', '91', '92', '93', '94', '95',
        '98', '211', '212', '213', '216', '218', '220', '221', '222', '223', '224', '225', '226',
        '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239',
        '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252',
        '253', '254', '255', '256', '257', '258', '260', '261', '262', '263', '264', '265', '266',
        '267', '268', '269', '290', '291', '297', '298', '299', '350', '351', '352', '353', '354',
        '355', '356', '357', '358', '359', '370', '371', '372', '373', '374', '375', '376', '377',
        '378', '379', '380', '381', '382', '383', '385', '386', '387', '389', '420', '421', '423',
        '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592',
        '593', '594', '595', '596', '597', '598', '599', '670', '672', '673', '674', '675', '676',
        '677', '678', '679', '680', '681', '682', '683', '685', '686', '687', '688', '689', '690',
        '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961', '962', '963',
        '964', '965', '966', '967', '968', '970', '971', '972', '973', '974', '975', '976', '977',
        '992', '993', '994', '995', '996', '998'
    ];
    
    // Verificar si comienza con un código de país válido
    for (const code of validCountryCodes) {
        if (normalized.startsWith(code)) {
            const localNumber = normalized.substring(code.length);
            // El número local debe tener al menos 4 dígitos
            if (localNumber.length >= 4) {
                return true;
            }
        }
    }
    
    // Si no coincide con patrones específicos ni tiene código de país conocido,
    // pero tiene longitud válida y solo dígitos, lo aceptamos como válido
    // (para formatos locales que no incluyen código de país)
    return true;
}
