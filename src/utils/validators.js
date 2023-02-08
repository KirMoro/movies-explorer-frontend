const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;

export const nameValidator = (name) => {
    if (!name) {
        return 'Имя не указано';
    }
    if (name.length < 2 || name.length > 30) {
        return 'Неправильный формат имени';
    }
    return '';
};

export const emailValidator = (email) => {
    if (!email) {
        return 'Email не указан';
    }
    if (!emailRegex.test(email)) {
        return 'Неправильный формат email';
    }
    return '';
};

export const passwordValidator = (password) => {
    if (!password) {
        return 'Пароль не указан';
    }
    if (password.length < 8) {
        return 'Пароль должен быть минимум 8 символов';
    }
    return '';
};

export const searchValidator = (request) => {
    if (!request) {
        return 'Нужно ввести ключевое слово';
    }
    return '';
};
