import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = ({ onClose, onConfirm }) => {
  const [formInputs, setFormInputs] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInput = useRef(null);
  const streetInput = useRef(null);
  const postalCodeInput = useRef(null);
  const cityInput = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    const { value: enteredName } = nameInput.current;
    const { value: enteredStreet } = streetInput.current;
    const { value: enteredPostalCode } = postalCodeInput.current;
    const { value: enteredCity } = cityInput.current;

    const validName = !isEmpty(enteredName);
    const validStreet = !isEmpty(enteredStreet);
    const validPostalCode = isFiveChars(enteredPostalCode);
    const validCity = !isEmpty(enteredCity);

    setFormInputs({
      name: validName,
      street: validStreet,
      postalCode: validPostalCode,
      city: validCity,
    });

    const formValidity = [
      validName,
      validStreet,
      validPostalCode,
      validCity,
    ].every((element) => element);

    if (!formValidity) {
      return;
    }

    onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form onSubmit={submit}>
      <div
        className={`${classes.control} ${
          formInputs.name ? '' : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputs.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputs.street ? '' : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputs.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputs.postalCode ? '' : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInput} />
        {!formInputs.postalCode && (
          <p>Please enter a valid postal code (5 character long)!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputs.city ? '' : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputs.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
