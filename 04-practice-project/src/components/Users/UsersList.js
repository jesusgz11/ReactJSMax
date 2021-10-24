import Card from "../UI/Card";
import { usersContainer } from "./UsersList.module.css";

const UsersList = ({ users }) => {
  return (
    <Card className={usersContainer}>
      <ul>
        {users.map(({ name, age }, idx) => (
          <li key={`${name}_${idx}`}>
            {name} ({age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
