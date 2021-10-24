import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Auth from "../../store/auth-context";
import Input from "../UI/Input/Input";

const reducerEmail = (state, action) => {
  if (action.type === "INPUT_USER") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const reducerPassword = (state, action) => {
  if (action.type === "INPUT_USER") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(reducerEmail, {
    value: "",
    isValid: null,
  });

  const [password, dispatchPassword] = useReducer(reducerPassword, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: validEmail, value: emailValue } = email;
  const { isValid: validPassword, value: passwordValue } = password;

  const { onLogin } = useContext(Auth);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check Validity!");
      setFormIsValid(validEmail && validPassword);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [validEmail, validPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "INPUT_USER", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_USER", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      onLogin(emailValue, passwordValue);
    } else if (!validEmail) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          state={email}
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
          type="email"
          label="E-Mail"
        />
        <Input
          ref={passwordInputRef}
          id="password"
          state={password}
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
          type="password"
          label="Password"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
