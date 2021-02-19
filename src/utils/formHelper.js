/**
 * helper function for a reducer to validate and dispatch values
 * @param state  state
 * @param action
 * @param action.field field formName
 * @param action.type action type
 * @param action.value field value
 * @param initialFormValueState initial values
 * @returns {object} changed state
 */

const reducerForForm = (state, { field, type, value }, initialFormValueState) => {
  switch (type) {
    case 'DISPATCH':
      const updateValues = {
        ...state.inputValues,
        [field]: value.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [`${field}Validity`]: value.validity.valid,
      };
      const updateErrors = {
        ...state.inputErrors,
        [`${field}Error`]: value.validationMessage,
      };
      let formIsValid = true;
      for (const key in updatedValidities) {
        const keyValue = key.replace('Validity', '');
        formIsValid = (formIsValid && updatedValidities[key] && updateValues[keyValue]);
      }
      return {
        inputValidities: updatedValidities,
        inputErrors: updateErrors,
        formValid: formIsValid,
        inputValues: updateValues,
      };
    case 'RESET':
      return initialFormValueState;
    default:
      break;
  }
};
export default reducerForForm;
