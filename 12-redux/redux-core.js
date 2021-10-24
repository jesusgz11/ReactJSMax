const redux = require('redux');

// Init state when redux create store runs otherwise is undefined
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return { counter: ++state.counter };
  }

  if (action.type === 'decrement') {
    return { counter: --state.counter };
  }

  return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });
