import { useState } from "react";
import {
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function AuthForm({ isLogin, onSubmit, onPress, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.innerContainer}>
          <KeyboardAvoidingView enabled>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/image/userlogin.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="Email"
                style={[
                  styles.inputStyle,
                  emailIsInvalid && styles.errorTextStyle,
                ]}
                autoCapitalize="none"
                keyboardType="email-address"
                secureTextEntry={true}
                onChangeText={updateInputValueHandler.bind(this, "email")}
                value={enteredEmail}
              />
            </View>
            {!isLogin && (
              <View style={styles.sectionStyle}>
                <TextInput
                  placeholder="Confirm Email"
                  style={[
                    styles.inputStyle,
                    emailsDontMatch && styles.errorTextStyle,
                  ]}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  secureTextEntry={true}
                  onChangeText={updateInputValueHandler.bind(
                    this,
                    "confirmEmail"
                  )}
                  value={enteredConfirmEmail}
                />
              </View>
            )}
            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="Password"
                style={[
                  styles.inputStyle,
                  passwordIsInvalid && styles.errorTextStyle,
                ]}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={updateInputValueHandler.bind(this, "password")}
                value={enteredPassword}
              />
            </View>
            {!isLogin && (
              <View style={styles.sectionStyle}>
                <TextInput
                  placeholder="Enter Password"
                  autoCapitalize="none"
                  style={[
                    styles.inputStyle,
                    passwordsDontMatch && styles.errorTextStyle,
                  ]}
                  onChangeText={updateInputValueHandler.bind(
                    this,
                    "confirmPassword"
                  )}
                  secureTextEntry={true}
                  value={enteredConfirmPassword}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={submitHandler}
              >
                <Text style={styles.buttonTextStyle}>
                  {isLogin ? "Login" : "Signup"}
                </Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
               onPress={onPress}
              >
                {isLogin ? "New Here ? Register" : "Already have an account ? Login"}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF9CA",
    maxWidth: windowWidth,
    maxHeight: windowHeight,
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: "column",
  },
  innerContainer: {
    alignContent: "center",
    margin: 15,
    flexDirection: "column",
  },
  imageContainer: {
    alignSelf: "center",
    width: "80%",
    height: "50%",
    padding: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  sectionStyle: {
    margin: 3,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
  },
  inputStyle: {
    width: "100%",
    fontSize: 15,
    height: 35,
    borderRadius: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#FFDEB4",
  },
  registerTextStyle: {
    marginTop: 3,
    color: "darkviolet",
  },
  errorTextStyle: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#FF6363",
    color: "#FF6363",
  },

  buttonContainer: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    padding: 5,
    borderWidth: 4,
    width: "70%",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "white",
    backgroundColor: "#CEE5D0",
  },
});

