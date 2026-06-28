import { VALIDATION_MESSAGES } from "./constants";

/*
|--------------------------------------------------------------------------
| Regular Expressions
|--------------------------------------------------------------------------
*/

export const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/*
|--------------------------------------------------------------------------
| Internal Helpers
|--------------------------------------------------------------------------
*/

const isEmpty = (value) => {
  return String(value ?? "").trim().length === 0;
};

/*
|--------------------------------------------------------------------------
| First Name
|--------------------------------------------------------------------------
*/

export const validateFirstName = (firstName) => {
  if (isEmpty(firstName)) {
    return VALIDATION_MESSAGES.FIRST_NAME_REQUIRED;
  }

  return "";
};

/*
|--------------------------------------------------------------------------
| Last Name
|--------------------------------------------------------------------------
*/

export const validateLastName = (lastName) => {
  if (isEmpty(lastName)) {
    return VALIDATION_MESSAGES.LAST_NAME_REQUIRED;
  }

  return "";
};

/*
|--------------------------------------------------------------------------
| Email
|--------------------------------------------------------------------------
*/

export const validateEmail = (email) => {
  if (isEmpty(email)) {
    return VALIDATION_MESSAGES.EMAIL_REQUIRED;
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return VALIDATION_MESSAGES.EMAIL_INVALID;
  }

  return "";
};

/*
|--------------------------------------------------------------------------
| Department
|--------------------------------------------------------------------------
*/

export const validateDepartment = (department) => {
  if (isEmpty(department)) {
    return VALIDATION_MESSAGES.DEPARTMENT_REQUIRED;
  }

  return "";
};

/*
|--------------------------------------------------------------------------
| Complete User Validation
|--------------------------------------------------------------------------
*/

export const validateUser = (user) => {
  const validationErrors = {};

  const firstNameError = validateFirstName(
    user.firstName
  );

  if (firstNameError) {
    validationErrors.firstName = firstNameError;
  }

  const lastNameError = validateLastName(
    user.lastName
  );

  if (lastNameError) {
    validationErrors.lastName = lastNameError;
  }

  const emailError = validateEmail(
    user.email
  );

  if (emailError) {
    validationErrors.email = emailError;
  }

  const departmentError =
    validateDepartment(
      user.department
    );

  if (departmentError) {
    validationErrors.department =
      departmentError;
  }

  return validationErrors;
};

/*
|--------------------------------------------------------------------------
| Validation Status
|--------------------------------------------------------------------------
*/

export const isUserValid = (user) => {
  return (
    Object.keys(
      validateUser(user)
    ).length === 0
  );
};