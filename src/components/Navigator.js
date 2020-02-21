import React, { useContext } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import CategorieScreen from "../screens/Categories";
import SettingScreen from "../screens/Setting";
import BookMarkScreen from "../screens/Bookmark";
import SinglePost from "../screens/SinglePost";
import CategorieList from "../screens/CategorieList";
import Contact from "../screens/Contact";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from "react-native-paper";
const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Post" component={SinglePost} />
    </Stack.Navigator>
  );
}
function BookMarkStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmark" component={BookMarkScreen} />
      <Stack.Screen name="Post" component={SinglePost} />
    </Stack.Navigator>
  );
}
function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}
function CategorieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorie" component={CategorieScreen} />
      <Stack.Screen name="CategorieList" component={CategorieList} />
      <Stack.Screen name="Post" component={SinglePost} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function DashboardTabNavigator() {
  // const { theme } = useContext(ThemeContext);
  // let paper_theme = theme ? PaperDarkTheme : PaperDefaultTheme;
  // let nav_theme = theme ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider >
      <NavigationContainer >
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Categories" component={CategorieStack} />
          <Tab.Screen name="Bookmark" component={BookMarkStack} />
          <Tab.Screen name="Settings" component={SettingStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
