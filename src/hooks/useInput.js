import { useEffect, useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [valueIsValid, setValueIsValid] = useState("");

  const inputIsValid = validateValue(enteredValue);
  const hasError = !inputIsValid;
  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = (e) => {
    if (hasError) {
      setValueIsValid(false);
    } else if (!hasError) {
      setValueIsValid(true);
    }
  };
  useEffect(() => {}, [hasError]);

  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
