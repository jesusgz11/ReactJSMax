import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  const newUser = (name, age) => {
    setUsers((prevUsers) => [...prevUsers, { name, age }]);
  };

  return (
    <>
      <AddUser newUser={newUser} />
      <UsersList users={users} />
    </>
  );
}

export default App;
