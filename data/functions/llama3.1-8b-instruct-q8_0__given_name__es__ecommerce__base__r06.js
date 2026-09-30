function validate(str) {
    if (str === "") {
        return false;
    }

    let pattern = /^[a-zA-Z]+[\s\.]?[a-zA-Z]*$/;

    if (!str.match(pattern)) {
        return false;
    }

    let parts = str.split(' ');

    for (let i = 1; i < parts.length - 1; i++) {
        if (i % 2 === 0) {
            return false;
        }
    }

    return true;
}
