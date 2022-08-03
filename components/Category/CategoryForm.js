import { useState } from 'react';
import {View, ScrollView ,StyleSheet, Text, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Alert, SafeAreaView} from 'react-native';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function CategoryForm() {
  const navigation = useNavigation();
  const [catID, setCatID] = useState("");
  const [description, setCatDescription] = useState("");
  const [name, setCatName] = useState("");
  const [image, setCatImage] = useState("");


  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "id":
        setCatID(enteredValue);
        break;
      case "name":
        setCatName(enteredValue);
        break;
      case "description":
        setCatDescription(enteredValue);
        break;
      case "image":
        setCatImage(enteredValue);
        break;
    }
  }
  const submitHandler = async() => {
    try{
      await axios
        .post(`https://food-web-backend.herokuapp.com/api/categories`, {
          catID,
          name,
          description,
          image,
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
    }
    catch(err){
        console.log(err);
    }
  }
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
                  value={name}
                />
              </View>
              <View style={styles.sectionStyle}>
                <Text style={styles.textStyle}>Category Description: </Text>
                <TextInput
                  placeholder="Enter description..."
                  style={styles.inputStyle}
                  onChangeText={updateInputValueHandler.bind(
                    this,
                    "description"
                  )}
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

              <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={submitHandler}>
                  <Text style={styles.buttonText}>Add Category</Text>
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

export default CategoryForm;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF9CA",
  },
  scrollViewContainer: {
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    elevation: 5,
    shadowOffset: 2,
    alignItems: "center",
    padding: 20,
    margin: 10
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
    borderWidth: 2
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
  }

});
