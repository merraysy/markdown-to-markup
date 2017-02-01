export default (fieldName, previewName, ...validators) => {
  return (state) => {
    for (let validator of validators) {
      let error = validator(state, fieldName, previewName);
      if (error) return error;
    }
    return null;
  };
}; // end-validate
