import { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function MealsForm() {
  const navigation = useNavigation();
  const [mealID, setMealID] = useState("");
  const [description, setMealDescription] = useState("");
  const [name, setMealName] = useState("");
  const [image, setMealImage] = useState("");
  const [enteredcategory, setCategory] = useState("");
  const [affordability, setAffordability] = useState("");
  const [complexity, setComplexity] = useState("");
  const [enteredingredients, setIngredients] = useState("");
  const [enteredsteps, setSteps] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "id":
        setMealID(enteredValue);
        break;
      case "name":
        setMealName(enteredValue);
        break;
      case "description":
        setMealDescription(enteredValue);
        break;
      case "image":
        setMealImage(enteredValue);
        break;
      case "category":
        setCategory(enteredValue);
        break;
      case "affordability":
        setAffordability(enteredValue);
        break;
      case "complexity":
        setComplexity(enteredValue);
        break;
      case "ingredients":
        setIngredients(enteredValue);
        break;
      case "steps":
        setSteps(enteredValue);
        break;
    }
  }
  const submitHandler = async () => {
    const category = enteredcategory.split(",");
    const steps = enteredsteps.split(",");
    const ingredients = enteredingredients.split(",");
    try {
      await axios
        .post(`https://food-web-backend.herokuapp.com/api/meals`, {
          mealID,
          name,
          description,
          image,
          category,
          ingredients,
          affordability,
          complexity,
          steps,
        })
        .then((res) => {
          if (res.status == 201) {
            Alert.alert("Submit Successfully");
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
          {/* <KeyboardAvoidingView enabled={false}> */}
          <View style={styles.outerContainer}>
            {/* <View style={styles.innerContainer}> */}
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Meal ID: </Text>
              <TextInput
                placeholder="Enter id..."
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(this, "id")}
                value={mealID}
              />
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Meal Name: </Text>
              <TextInput
                placeholder="Enter name..."
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(this, "name")}
                value={name}
              />
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Meal Description: </Text>
              <TextInput
                placeholder="Enter description..."
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(this, "description")}
                value={description}
              />
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Enter Image Link: </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Image Link..."
                onChangeText={updateInputValueHandler.bind(this, "image")}
                value={image}
              />
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Category Belong: </Text>
              <TextInput
                placeholder="Enter categories..."
                style={styles.inputStyle}
                multiline
                editable
                onChangeText={updateInputValueHandler.bind(this, "category")}
                value={enteredcategory}
              />
              <Text>*use comma's to separate the categories </Text>
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Affordability: </Text>
              <TextInput
                placeholder="Enter affordability..."
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(
                  this,
                  "affordability"
                )}
                value={affordability}
              />
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Complexity: </Text>
              <TextInput
                placeholder="Enter complexity..."
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(this, "complexity")}
                value={complexity}
              />
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Ingredients: </Text>
              <TextInput
                placeholder="Enter ingredients..."
                multiline
                editable
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(this, "ingredients")}
                value={enteredingredients}
              />
              <Text>*use comma's to separate the ingredients </Text>
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.textStyle}>Steps: </Text>
              <TextInput
                placeholder="Enter steps..."
                multiline
                editable
                style={styles.inputStyle}
                onChangeText={updateInputValueHandler.bind(this, "steps")}
                value={enteredsteps}
              />
              <Text>*use comma's to separate the steps </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.5} onPress={submitHandler}>
                <Text style={styles.buttonText}>Add Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MealsForm;

const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
    backgroundColor: "#FFF9CA",
    height: "100%",
  },
  outerContainer: {
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
