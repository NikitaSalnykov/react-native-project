import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import Home from './Screens/Home/Home';
import CommentsScreen from './Screens/CommentsScreen/CommentsScreen';
import MapScreen from './Screens/MapScreen/MapScreen';
import PhoneCamera from './Screens/Camera';
import Map from './Screens/Map';
import LogoutButton from './Components/LogoutButton.jsx';
import BackPage from "./assets/svg/back";
import { TouchableOpacity } from 'react-native';
import BackPageButton from './Components/BackPageButton';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  const optionsFn = (titleName, show, back) => {
    return {
      title: titleName,
      headerShown: show,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#fff",
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
      },
      headerTintColor: "red",
      headerTitleStyle: {
        fontFamily: "Roboto-Medium",
        color: "#212121",
        fontSize: 17,
      },
      headerRight: () => (<LogoutButton />),
      headerLeft: () => (back && <BackPageButton/>
      ),
    };
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="Registration" component={RegistrationScreen} options={optionsFn("Реєстрація", false)} />
        <MainStack.Screen name="Login" component={LoginScreen} options={optionsFn("Авторизація", false)} />
        <MainStack.Screen name="Home" component={Home} options={optionsFn("Home", false)} />
        <MainStack.Screen name="CommentsScreen" component={CommentsScreen} options={{ ...optionsFn("Створити публікацію", true, true), tabBarStyle: { display: 'none' } }} />
        <MainStack.Screen name="MapScreen" component={MapScreen} options={optionsFn("MapScreen", false)} />
        <MainStack.Screen name="Camera" component={PhoneCamera} options={optionsFn("Camera", false)} />
        <MainStack.Screen name="Map" component={Map} options={optionsFn("Map", false)} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
