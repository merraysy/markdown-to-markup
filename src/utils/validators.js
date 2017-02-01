export default {
  required: () => {
    return (state, fieldName, previewName) => {
      if (!state[fieldName]) {
        return { [fieldName]: `"${previewName}" is required.` };
      } else {
        return null;
      }
    };
  },
  email: () => {
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (state, fieldName, previewName) => {
      if (!emailRe.test(state[fieldName])) {
        return { [fieldName]: `"${previewName}" is not a valid email.` };
      } else {
        return null;
      }
    };
  },
  minLength: (length) => {
    return (state, fieldName, previewName) => {
      if (state[fieldName].length < length) {
        return { [fieldName]: `"${previewName}" must be at least ${length} characters.` };
      } else {
        return null;
      }
    };
  },
  match: (fieldToMatch, matchPreviewName) => {
    return (state, fieldName, previewName) => {
      if (state[fieldName] !== state[fieldToMatch]) {
        return { [fieldName]: `"${previewName}" and "${matchPreviewName}" do not match.` };
      } else {
        return null;
      }
    };
  }
}; // end-validators
