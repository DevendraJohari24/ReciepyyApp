import { Pressable, StyleSheet, Platform } from "react-native";
import { View, Text , Image} from "react-native";
function CategoryGridTile({ title, description , catID, image, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri : image}}
            style={styles.image}
            resizeMode="stretch"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>#{catID}</Text>
          </View>
          <View style={styles.extraLine}></View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sideText}>{description}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    height: 200,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  extraLine:{
    width: "100%",
    backgroundColor: "gray",
    padding: 0.5
  },
  innerContainer:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 4
  },
  imageContainer: {
    padding: 3,
    height: 100,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: "100%",
    width: "100%"
  },
  textContainer:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  title:{
    fontSize: 18,
    letterSpacing: 2,
  },
  subtitle:{
    color: "green",
    textDecorationLine: "underline",
    fontSize: 14
  },
  descriptionContainer:{
      flex: 1,
      alignItems: "flex-start",
      paddingLeft: 5,
      paddingTop: 2
  },
  sideText:{
    fontSize: 12,
  }
});
