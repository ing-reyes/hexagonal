// Description: This function adds an error message to a specific field in the errors object. If the field does not exist, it initializes it as an empty array before pushing the error message.
// This function is useful for validating user input and collecting error messages in a structured way.
export const addErrorDto = (field: string, message: string, errors: Record<string, string[]>) => {

    if (!errors[field]) {
        errors[field] = [];
    }
    errors[field].push(message);

    return errors;
};