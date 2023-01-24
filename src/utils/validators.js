const emailRegex = /^.+@.+$/;

export const nameValidator = name => {
    if (!name) {
        return "Имя не указано";
    } else if (name.length < 2 || name.length > 30) {
        return "Неправильный формат имени";
    }
    return "";
};

export const emailValidator = email => {
    if (!email) {
        return "Email не указан";
    } else if (!emailRegex.test(email)) {
        return "Неправильный формат email";
    }
    return "";
};

export const passwordValidator = password => {
    if (!password) {
        return "Пароль не указан";
    } else if (password.length < 8) {
        return "Пароль должен быть минимум 8 символов";
    }
    return "";
};
