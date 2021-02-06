export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;

  // check for required field
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  // check for min length
  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  // check for max length
  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }
  return isValid;
}
