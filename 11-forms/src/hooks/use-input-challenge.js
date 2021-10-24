import { useState, useCallback } from 'react';

const useInput = (validateFn) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const valueIsValid = validateFn(value);
  const hasError = !valueIsValid && touched;

  const valueChangeHandler = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const blurHandler = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue('');
    setTouched(false);
  }, []);

  return {
    valueChangeHandler,
    value,
    valueIsValid,
    hasError,
    blurHandler,
    reset,
  };
};

export default useInput;
