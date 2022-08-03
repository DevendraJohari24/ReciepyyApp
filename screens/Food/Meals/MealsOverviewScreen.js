import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MealsList from "../../../components/Meals/MealsList";

function MealsOverviewScreen({ navigation, route }) {
  const catName = route.params.categoryName;
  const [displayMeals, setDisplayMeals] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getMealsByCategoryID() {
        try {
          const meals = await axios.get(
            "https://food-web-backend.herokuapp.com/api/meals/categoryBelong/" +
              catName
          );
          setDisplayMeals(meals.data.meal);
        } catch (error) {
          console.log(error);
        }
      }
      getMealsByCategoryID();
      navigation.setOptions({
        title: catName,
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MealsList items={displayMeals} />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f1dca7",
  },
});
