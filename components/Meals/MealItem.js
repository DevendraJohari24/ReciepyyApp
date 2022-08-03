import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  Platform,
  Text,
  StyleSheet,
  View,
  Image,
  Button,
} from "react-native";

function MealItem({ id, name, description, image }) {
  const navigation = useNavigation();

  function selectMealItemHandler() {
    navigation.navigate("MealsDetail", {
      mealID: id,
      mealName: name,
    });
  }

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectMealItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.singleLine}></View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    height: 200,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    height: 120,
    borderWidth: 2,
    borderColor: "gray",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    padding: 4
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  singleLine: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "gray",
    padding: 0.5,
  },
  descriptionContainer: {
    zIndex: 2,
    alignItems: "center",
    padding: 5
  },
});
