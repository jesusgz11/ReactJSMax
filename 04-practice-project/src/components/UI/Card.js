import { card } from "./Card.module.css";

const Card = ({ children, className }) => {
  return <div className={`${card} ${className}`}>{children}</div>;
};

export default Card;
