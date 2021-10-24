import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

const Counter = () => {
  const showCounter = useSelector((state) => state.counter.showCounter);

  const counter = useSelector((state) => state.counter.counter);

  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(counterActions.toogleCounter());
  };

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const increaseBy = () => {
    dispatch(counterActions.increase(5)); // {type: UNIQUE_ID, payload: 5}
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={increaseBy}>Increment By 5</button>

        <button onClick={decrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
