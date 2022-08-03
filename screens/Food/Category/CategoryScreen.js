import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
import CategoryGridTile from "../../../components/Category/CategoryGridTile";

function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryName: itemData.item.name,
      });
    }
    return (
      <CategoryGridTile
        title={itemData.item.name}
        description={itemData.item.description}
        catID={itemData.item.catID}
        image={itemData.item.image}
        onPress={pressHandler}
      />
    );
  }

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getAllCategories() {
        try {
          const category = await axios.get(
            "https://food-web-backend.herokuapp.com/api/categories/"
          );
          setCategories(category.data.category);
        } catch (error) {
          console.log(error);
        }
      }

      getAllCategories();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

export default CategoryScreen;
