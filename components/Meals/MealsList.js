import { FlatList, View, StyleSheet } from "react-native";
import MealItem from "./MealItem";

function MealsList({ items }) {
  function renderMealItem(itemData) {
    const mealItemProps = {
      id: itemData.item.mealID,
      name: itemData.item.name,
      description: itemData.item.description,
      ingredients: itemData.item.ingredients,
      steps: itemData.item.steps,
      complexity: itemData.item.complexity,
      affordability: itemData.item.affordability,
      image: itemData.item.image,
      category: itemData.item.category,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={renderMealItem}
      />
  );
}

export default MealsList;

