import LoginScreen from "../User/LoginScreen";
import SignupScreen from "../User/SignupScreen";

function AuthStack({ stack: Stack }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#B2A4FF" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Register Here",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
