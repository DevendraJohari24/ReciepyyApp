import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AuthStack from "./screens/Navigation/AuthStack";
import AuthenticatedStack from "./screens/Navigation/AuthenticatedStack";

import LoadingOverlay from "./components/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();



function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack stack={Stack} />}
      {authCtx.isAuthenticated && <AuthenticatedStack stack={Stack} />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay />
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
        <StatusBar style="light" />
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
    </>
  );
}
