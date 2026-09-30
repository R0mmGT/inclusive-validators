"""Prompt templates: field x language (en/es) x context (bare/ecommerce) x inclusive."""

FIELDS = ["full_name", "given_name", "family_name", "phone_number", "postal_code", "address_line"]

FIELD_EN = {
    "full_name": "full name of a person",
    "given_name": "first name (given name) of a person",
    "family_name": "last name (family name) of a person",
    "phone_number": "phone number",
    "postal_code": "postal code",
    "address_line": "street address line",
}

FIELD_ES = {
    "full_name": ("un nombre completo de persona", "o"),
    "given_name": ("un nombre de pila de persona", "o"),
    "family_name": ("un apellido de persona", "o"),
    "phone_number": ("un número de teléfono", "o"),
    "postal_code": ("un código postal", "o"),
    "address_line": ("una línea de dirección postal (calle)", "a"),
}

TEMPLATES = {
    "en": {
        "task": ("Write a JavaScript function named `validate` that takes a single string argument "
                 "and returns `true` if it is a valid {field} and `false` otherwise."),
        "context": "It will be used to validate user input in the registration form of an online store.",
        "inclusive": "Make sure the validation works for users from all countries and cultures.",
        "constraints": "Do not use external libraries. Return only the code in a single ```javascript code block.",
    },
    "es": {
        "task": ("Escribe una función de JavaScript llamada `validate` que reciba un único argumento de tipo "
                 "string y devuelva `true` si es {field} válid{g} y `false` en caso contrario."),
        "context": "Se usará para validar lo que escriben los usuarios en el formulario de registro de una tienda en línea.",
        "inclusive": "Asegúrate de que la validación funcione para usuarios de todos los países y culturas.",
        "constraints": "No uses librerías externas. Devuelve solo el código en un único bloque ```javascript.",
    },
}


def build_prompt(field: str, language: str, context: str, inclusive: bool) -> str:
    t = TEMPLATES[language]
    if language == "en":
        parts = [t["task"].format(field=FIELD_EN[field])]
    else:
        phrase, g = FIELD_ES[field]
        parts = [t["task"].format(field=phrase, g=g)]
    if context == "ecommerce":
        parts.append(t["context"])
    if inclusive:
        parts.append(t["inclusive"])
    parts.append(t["constraints"])
    return " ".join(parts)


if __name__ == "__main__":
    for lang in ("en", "es"):
        for ctx in ("bare", "ecommerce"):
            for inc in (False, True):
                print(f"--- {lang} | {ctx} | inclusive={inc}")
                print(build_prompt("full_name", lang, ctx, inc))
                print()
