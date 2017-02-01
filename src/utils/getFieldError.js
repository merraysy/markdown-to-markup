export default (fieldName, formErrors) => {
  let errorMessage = '';
  formErrors.forEach((formError) => {
    if (formError && formError[fieldName]) {
      errorMessage = formError[fieldName];
    }
  });
  return errorMessage;
}; // end-getFieldError
