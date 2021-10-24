import meals from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ cartHandler }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton cartHandler={cartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
