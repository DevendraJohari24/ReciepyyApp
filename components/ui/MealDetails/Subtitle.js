import { View, Text, StyleSheet } from "react-native";
function Subtitle({ children }) {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subTitle: {
    color: "#2d6a4f",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleContainer: {
    padding: 6,
    margin: 6,
    borderBottomWidth: 2,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: "white",
  },
});
