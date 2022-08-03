import { View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import IconButton from "../../components/ui/IconButton";
import CategoryScreen from "../Food/Category/CategoryScreen";
import MealsOverviewScreen from "../Food/Meals/MealsOverviewScreen";
import MealsDetailScreen from "../Food/Meals/MealsDetailScreen";
import CategoryAddScreen from "../Food/Category/CategoryAddScree";
import MealsAddScreen from "../Food/Meals/MealsAddScreen";
import { useNavigation } from "@react-navigation/native";
import CategoryDeleteScreen from "../Food/Category/CategoryDeleteScreen";
import MealsDeleteScreen from "../Food/Meals/MealsDeleteScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "../Favorites/FavoriteScreen";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { store } from "../../store/redux/store";
const Drawer = createDrawerNavigator();

function DrawerNaigator() {
  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#997b66" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#f1dca7" },
        drawerContentStyle: { backgroundColor: "#997b66" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#f1dca7",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon="trash"
                color={tintColor}
                size={24}
                onPress={() => {
                  navigation.navigate("DeleteCategory");
                }}
              />
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onPress={() => {
                  navigation.navigate("AddCategory");
                }}
              />
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={authCtx.logout}
              />
            </View>
          ),
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
        name="Categories"
        component={CategoryScreen}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack({ stack: Stack }) {
  const navigation = useNavigation();
  return (
    <>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#997b66" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="DrawerScreen"
            component={DrawerNaigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            options={{
              headerRight: ({ tintColor }) => (
                <View style={{ flexDirection: "row" }}>
                  <IconButton
                    icon="trash"
                    color={tintColor}
                    size={24}
                    onPress={() => {
                      navigation.navigate("DeleteMeal");
                    }}
                  />
                  <IconButton
                    icon="add"
                    color={tintColor}
                    size={24}
                    onPress={() => {
                      navigation.navigate("AddMeal");
                    }}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="MealsDetail"
            component={MealsDetailScreen}
            options={{}}
          />
          <Stack.Screen name="AddCategory" component={CategoryAddScreen} />
          <Stack.Screen name="AddMeal" component={MealsAddScreen} />
          <Stack.Screen
            name="DeleteCategory"
            component={CategoryDeleteScreen}
          />
          <Stack.Screen name="DeleteMeal" component={MealsDeleteScreen} />
        </Stack.Navigator>
      </Provider>
    </>
  );
}

export default AuthenticatedStack;
