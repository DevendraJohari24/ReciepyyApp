import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import List from "../ui/MealDetails/List";
import Subtitle from "../ui/MealDetails/Subtitle";
import MealDetails from "./MealDetails";
import IconButton from "../ui/IconButton";
import {addFavorite, removeFavorite} from "../../store/redux/favorites";

function MealsDescription({ mealID, image, name, ingredients, category, steps , affordability, complexity }) {
  const navigation = useNavigation();
  
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

   const mealIsFavorite = favoriteMealIds.includes(mealID);
   function changeFavoriteStatusHandler() {
     if (mealIsFavorite) {
      console.log(mealIsFavorite)
       dispatch(
         removeFavorite({
           id: mealID,
         })
       );
     } else {
      console.log(mealIsFavorite);
       dispatch(
         addFavorite({
           id: mealID,
         })
       );
     }
   }

  useLayoutEffect(() => {
     navigation.setOptions({
       headerRight: () => {
         return (
           <IconButton
             icon={mealIsFavorite ? "star" : "star-outline"}
             color="white"
             size={18}
             onPress={changeFavoriteStatusHandler}
           />
         );
       },
     });
  }, [navigation, changeFavoriteStatusHandler]); 
  return (
    <ScrollView style={styles.rootContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View>
          <MealDetails
            affordability={affordability}
            complexity={complexity}
            textStyle={styles.detailText}
          />
        </View>
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Categories</Subtitle>
            <List data={category} />
          </View>
        </View>
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List data={ingredients} />
            <Subtitle>Steps</Subtitle>
            <List data={steps} />
          </View>
        </View>
      </ScrollView>
    );
}

export default MealsDescription;



const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
    height: "100%",
    backgroundColor: "#f1dca7",
  },
  imageContainer: {
    margin: 10,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 350,
  },
  titleContainer: {
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#d6ce93",
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "#b23a48",
    fontSize: 15,
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
