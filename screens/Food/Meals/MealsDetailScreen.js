import { useLayoutEffect, useState } from "react";
import MealsDescription from "../../../components/Meals/MealsDescription";
import { ActivityIndicator, Text, View } from "react-native";
function MealsDetailScreen({ navigation, route }) {
  const mealID = route.params.mealID;
  const mealName = route.params.mealName;

  const [isLoading, setLoading] = useState(true);
  const [displayMeals, setDisplayMeals] = useState([]);

  const getMeals = async () => {
    try {
      const response = await fetch(
        "https://food-web-backend.herokuapp.com/api/meals/mealId/" + mealID
      );
      const json = await response.json();
      setDisplayMeals(json.meal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMeals();
      navigation.setOptions({
        title: mealName,
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MealsDescription
          image={displayMeals.image}
          name={displayMeals.name}
          ingredients={displayMeals.ingredients}
          steps={displayMeals.steps}
          affordability={displayMeals.affordability}
          complexity={displayMeals.complexity}
          category={displayMeals.category}
          mealID={displayMeals.mealID}
        />
      )}
    </View>
  );
}

export default MealsDetailScreen;
