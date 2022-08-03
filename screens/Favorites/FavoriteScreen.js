import { useSelector } from "react-redux";
import MealsList from "../../components/Meals/MealsList";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";


function FavoritesScreen({ navigation }) {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  useEffect(() => {
      const getFavMeals = () => {
        setFavoriteMeals([]);
        favoriteMealIds.forEach(async(mealID) => {
          try {
            const response = await axios.get(
              "https://food-web-backend.herokuapp.com/api/meals/mealId/" +
                mealID
            );
            if (response.status === 200) {
              setFavoriteMeals((result) => [...result, response.data.meal]);
            }
          } catch (error) {
            console.log(error);
          }
        });
      };
      getFavMeals();
    }, [favoriteMealIds]);

    return (
      <Fragment>
          <MealsList items={favoriteMeals} />
      </Fragment>
    );
}

export default FavoritesScreen;
