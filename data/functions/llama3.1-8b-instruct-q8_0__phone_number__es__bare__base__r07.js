function validate(phoneNumber) {
    // Se remueven todos los espacios del string
    let phoneNumberClean = phoneNumber.replace(/\s/g, "");

	// El número de teléfono debe comenzar con 0 o 1 (país codigos)
	if (!(phoneNumberClean[0] === '0' || phoneNumberClean[0] === '1')) {
		return false;
	}

	// La longitud del número telefónico debe ser de entre 8 y 13 dígitos
	if ((phoneNumberClean.length < 8 || phoneNumberClean.length > 13)) {
		return false;
	}

    // El número telefónico solo puede contener números y no puede comenzar con ceros a menos que el primer dígito sea ocho o nueve
	if (!/^(\d{1,2}\.\ *)*(\d{3} .*)+(\d{3} .*)+(\d{4}|[0-9])$/.test(phoneNumberClean.replace(/\D/g,''))) {
		return false;
    }

    return true;
}
