import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import { input } from "./AddUser.module.css";
import { useState } from "react";

const AddUser = ({ newUser }) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [error, setError] = useState();

  const resetFields = () => {
    setUserAge("");
    setUserName("");
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (!userAge.trim() || !userName.trim()) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (userAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
    }
    newUser(userName, userAge);
    resetFields();
  };

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const userAgeHandler = (event) => {
    setUserAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          errorHandler={errorHandler}
        />
      )}
      <Card className={input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={userNameHandler}
          />
          <label htmlFor="userAge">Age</label>
          <input
            type="number"
            id="age"
            value={userAge}
            onChange={userAgeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
