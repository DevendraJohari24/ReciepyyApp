import { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function DeleteCategoryForm() {
  const navigation = useNavigation();
  const [catID, setCatID] = useState("");
  const [catName, setCatName] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "id":
        setCatID(enteredValue);
        break;
      case "name":
        setCatName(enteredValue);
        break;
    }
  }
  const submitHandler = async () => {
    try {
      await axios
        .delete(
          "https://food-web-backend.herokuapp.com/api/categories/categoryName/" +
            catName
        )
        .then((res) => {
          if (res.status == 200) {
            Alert.alert("Deleted Successfully");
          }
        })
        .catch((err) => {
          Alert.alert("Error Found! Try Again");
        })
        .finally(() => {
          navigation.goBack();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.mainBody}>
          <KeyboardAvoidingView enabled>
            <View style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.sectionStyle}>
                  <Text style={styles.textStyle}>Category ID: </Text>
                  <TextInput
                    placeholder="Enter id..."
                    style={styles.inputStyle}
                    onChangeText={updateInputValueHandler.bind(this, "id")}
                    value={catID}
                  />
                </View>
                <View style={styles.sectionStyle}>
                  <Text style={styles.textStyle}>Category Name: </Text>
                  <TextInput
                    placeholder="Enter name..."
                    style={styles.inputStyle}
                    onChangeText={updateInputValueHandler.bind(this, "name")}
                    value={catName}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity activeOpacity={0.5} onPress={submitHandler}>
                    <Text style={styles.buttonText}>Delete Category</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DeleteCategoryForm;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF9CA",
  },
  scrollViewContainer: {},
  innerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    elevation: 5,
    shadowOffset: 2,
    alignItems: "center",
    padding: 20,
    margin: 10,
  },
  sectionStyle: {
    width: "100%",
    alignItems: "flex-start",
    margin: 8,
  },
  textStyle: {
    padding: 2,
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "800",
  },
  inputStyle: {
    width: "100%",
    padding: 10,
    backgroundColor: "gray",
    height: 45,
    borderRadius: 6,
    borderWidth: 2,
  },
  buttonContainer: {
    backgroundColor: "gray",
    margin: 20,
    padding: 15,
    borderWidth: 2,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
