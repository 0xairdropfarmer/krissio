import React, {useContext} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import CategorieScreen from '../screens/Categories';
import SettingScreen from '../screens/Setting';
import BookMarkScreen from '../screens/Bookmark';
import SinglePost from '../screens/SinglePost';
import CategorieList from '../screens/CategorieList';
import Contact from '../screens/Contact';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../components/ThemeController';
import {useNetInfo} from '@react-native-community/netinfo';

import {Text, View} from 'react-native';
const Stack = createStackNavigator();

function HomeStack() {
  const netInfo = useNetInfo();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          headerRight: () =>
            netInfo.isConnected ? (
              <Text />
            ) : (
              <View style={{flexDirection: 'row', marginRight: 12}}>
                <MaterialCommunityIcons
                  name={'wifi-off'}
                  size={22}
                  color={'black'}
                />
                <Text>Your are offline</Text>
              </View>
            ),
        })}
      />
      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={({route}) => ({
          title: <Text>Is Connected? {netInfo.isConnected.toString()}</Text>,
        })}
      />
    </Stack.Navigator>
  );
}
function BookMarkStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmark" component={BookMarkScreen} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
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
function CategorieStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorie" component={CategorieScreen} />
      <Stack.Screen
        name="CategorieList"
        component={CategorieList}
        options={({route}) => ({title: route.params.categorie_name})}
      />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function DashboardTabNavigator() {
  const {theme} = useContext(ThemeContext);
  let paper_theme = theme ? PaperDarkTheme : PaperDefaultTheme;
  let nav_theme = theme ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paper_theme}>
      <NavigationContainer theme={nav_theme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Bookmark') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'apps' : 'apps-box';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-box';
              }

              // You can return any component that you like here!
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Categories" component={CategorieStack} />
          <Tab.Screen name="Bookmark" component={BookMarkStack} />
          <Tab.Screen name="Settings" component={SettingStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
