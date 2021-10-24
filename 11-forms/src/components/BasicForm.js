import useInput from "../hooks/use-input-challenge";

const ErrorMessage = ({
  errorIputFirstName = false,
  errorIputLastName = false,
  errorInputEmail = false,
}) => {
  if (errorIputFirstName) {
    return <p className="error-text">First name must not be empty.</p>;
  }
  if (errorIputLastName) {
    return <p className="error-text">Last name must not be empty.</p>;
  }
  if (errorInputEmail) {
    return <p className="error-text">Invalid Email.</p>;
  }
  return null;
};

const BasicForm = (props) => {
  const validateEmptyValue = (value) => value.trim() !== "";
  const validateEmail = (value) => value.includes("@");

  const {
    value: firstName,
    hasError: errorIputFirstName,
    valueIsValid: isValidFirstName,
    valueChangeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(validateEmptyValue);

  const {
    value: lastName,
    hasError: errorIputLastName,
    valueIsValid: isValidLastName,
    valueChangeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(validateEmptyValue);

  const {
    value: email,
    hasError: errorIputEmail,
    valueIsValid: isValidEmail,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const classes = {
    firstName: `form-control ${errorIputFirstName ? "invalid" : ""}`,
    lastName: `form-control ${errorIputLastName ? "invalid" : ""}`,
    email: `form-control ${errorIputEmail ? "invalid" : ""}`,
  };

  let isValidForm = false;

  if (isValidFirstName && isValidLastName && isValidEmail) {
    isValidForm = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isValidForm) {
      return;
    }
    console.log(firstName, lastName, email);
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={classes.firstName}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          <ErrorMessage errorIputFirstName={errorIputFirstName} />
        </div>
        <div className={classes.lastName}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          <ErrorMessage errorIputLastName={errorIputLastName} />
        </div>
      </div>
      <div className={classes.email}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <ErrorMessage errorInputEmail={errorIputEmail} />
      </div>
      <div className="form-actions">
        <button disabled={!isValidForm}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
