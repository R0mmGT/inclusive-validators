function validate(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
        return false;
    }

    // Eliminar espacios, guiones, puntos y paréntesis
    let cleaned = phoneNumber.replace(/[\s\-().]+/g, '');
    
    // Eliminar prefijo internacional opcional (+ o 00)
    if (cleaned.startsWith('+')) {
        cleaned = cleaned.substring(1);
    } else if (cleaned.startsWith('00')) {
        cleaned = cleaned.substring(2);
    }
    
    // Verificar que solo contenga dígitos
    if (!/^\d+$/.test(cleaned)) {
        return false;
    }
    
    // Longitudes mínimas y máximas según ITU-T E.164 y estándares mundiales
    const minLength = 4;  // Números muy cortos (ej: servicios de emergencia)
    const maxLength = 15; // Máximo según E.164 incluyendo código de país
    
    // Verificar longitud
    if (cleaned.length < minLength || cleaned.length > maxLength) {
        return false;
    }
    
    // Validar estructura básica:
    // 1. No puede empezar con 0 (después de eliminar prefijo internacional)
    // 2. Países pueden tener códigos de 1-3 dígitos, seguidos de número local
    // 3. Algunos números especiales pueden empezar con dígitos específicos
    
    // Lista de códigos de país de 1-3 dígitos según ITU
    // (esta es una simplificación - la lista real es más extensa)
    const countryCodePatterns = [
        /^1/, // Norte América
        /^7/, // Rusia, Kazajistán
        /^20/, /^27/, /^30/, /^31/, /^32/, /^33/, /^34/, /^36/, /^39/,
        /^40/, /^41/, /^43/, /^44/, /^45/, /^46/, /^47/, /^48/, /^49/,
        /^51/, /^52/, /^53/, /^54/, /^55/, /^56/, /^57/, /^58/, /^60/,
        /^61/, /^62/, /^63/, /^64/, /^65/, /^66/, /^81/, /^82/, /^84/,
        /^86/, /^90/, /^91/, /^92/, /^93/, /^94/, /^95/, /^98/, /^211/,
        /^212/, /^213/, /^216/, /^218/, /^220/, /^221/, /^222/, /^223/,
        /^224/, /^225/, /^226/, /^227/, /^228/, /^229/, /^230/, /^231/,
        /^232/, /^233/, /^234/, /^235/, /^236/, /^237/, /^238/, /^239/,
        /^240/, /^241/, /^242/, /^243/, /^244/, /^245/, /^246/, /^247/,
        /^248/, /^249/, /^250/, /^251/, /^252/, /^253/, /^254/, /^255/,
        /^256/, /^257/, /^258/, /^260/, /^261/, /^262/, /^263/, /^264/,
        /^265/, /^266/, /^267/, /^268/, /^269/, /^290/, /^291/, /^297/,
        /^298/, /^299/, /^350/, /^351/, /^352/, /^353/, /^354/, /^355/,
        /^356/, /^357/, /^358/, /^359/, /^370/, /^371/, /^372/, /^373/,
        /^374/, /^375/, /^376/, /^377/, /^378/, /^379/, /^380/, /^381/,
        /^382/, /^383/, /^385/, /^386/, /^387/, /^389/, /^420/, /^421/,
        /^423/, /^500/, /^501/, /^502/, /^503/, /^504/, /^505/, /^506/,
        /^507/, /^508/, /^509/, /^590/, /^591/, /^592/, /^593/, /^594/,
        /^595/, /^596/, /^597/, /^598/, /^599/, /^670/, /^672/, /^673/,
        /^674/, /^675/, /^676/, /^677/, /^678/, /^679/, /^680/, /^681/,
        /^682/, /^683/, /^685/, /^686/, /^687/, /^688/, /^689/, /^690/,
        /^691/, /^692/, /^850/, /^852/, /^853/, /^855/, /^856/, /^872/,
        /^880/, /^881/, /^882/, /^883/, /^886/, /^960/, /^961/, /^962/,
        /^963/, /^964/, /^965/, /^966/, /^967/, /^968/, /^970/, /^971/,
        /^972/, /^973/, /^974/, /^975/, /^976/, /^977/, /^979/, /^992/,
        /^993/, /^994/, /^995/, /^996/, /^998/
    ];
    
    // Verificar que coincida con algún código de país conocido
    const hasValidCountryCode = countryCodePatterns.some(pattern => 
        pattern.test(cleaned)
    );
    
    // Para números sin prefijo internacional explícito,
    // asumimos que incluyen código de país implícito
    if (!hasValidCountryCode) {
        // Permitir números locales para países específicos (ej: EE.UU. con 1)
        // o números de servicios especiales
        if (!/^[1-9]\d{3,}$/.test(cleaned)) {
            return false;
        }
    }
    
    return true;
}
