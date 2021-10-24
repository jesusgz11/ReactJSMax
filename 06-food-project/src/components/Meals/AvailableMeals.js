import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorHttp, setErrorHttp] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-733ef-default-rtdb.firebaseio.com/meals.json'
      );
      if (!response.ok) throw new Error('Something went wrong!');
      const data = await response.json();

      const fetchedMeals = Object.entries(data).map(
        ([key, { name, description, price }]) => {
          return {
            id: key,
            name,
            description,
            price,
          };
        }
      );
      setLoading(false);
      setMeals(fetchedMeals);
    };
    const fetchData = async () => {
      try {
        await fetchMeals();
      } catch (error) {
        setLoading(false);
        setErrorHttp(error.message);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className={classes['meals_loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorHttp) {
    return (
      <section className={classes['meals_error']}>
        <p>{errorHttp}</p>
      </section>
    );
  }

  const list = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{list}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
