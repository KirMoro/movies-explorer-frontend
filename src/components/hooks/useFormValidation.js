import { useState } from 'react';

import {
  nameValidator,
  emailValidator,
  passwordValidator,
  searchValidator,
} from '../../utils/validators';

const touchErrors = (errors) => Object.entries(errors).reduce((acc, [field, fieldError]) => {
  acc[field] = {
    ...fieldError,
    dirty: true,
  };
  return acc;
}, {});

export const useFormValidation = (form) => {
  const [errors, setErrors] = useState({
    name: {
      dirty: false,
      error: false,
      message: '',
    },
    email: {
      dirty: false,
      error: false,
      message: '',
    },
    password: {
      dirty: false,
      error: false,
      message: '',
    },
    request: {
      dirty: false,
      error: false,
      message: '',
    },
  });

  const validateForm = ({
    form, field, errors, forceTouchErrors = false,
  }) => {
    let isValid = true;

    let nextErrors = JSON.parse(JSON.stringify(errors));

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const {
      name, email, password, request,
    } = form;

    if (nextErrors.name.dirty && (field ? field === 'name' : true)) {
      const nameMessage = nameValidator(name, form);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;
      if (nameMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === 'email' : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === 'password' : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (passwordMessage) isValid = false;
    }

    if (nextErrors.request.dirty && (field ? field === 'request' : true)) {
      const requestMessage = searchValidator(request, form);
      nextErrors.request.error = !!requestMessage;
      nextErrors.request.message = requestMessage;
      if (requestMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
