import { useFonts } from 'expo-font';
import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import PostsScreen from './Screens/PostsScreen/PostsScreen';
import Home from './Screens/Home/Home';
import CreatePostsScreen from './Screens/CreatePostsScreen/CreatePostsScreen';
import CommentsScreen from './Screens/CommentsScreen/CommentsScreen';
import MapScreen from './Screens/MapScreen/MapScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import LogoutButton from './Components/LogoutButton.jsx';


export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

    if (!fontsLoaded) {
    return null;
    }
  
  const MainStack = createStackNavigator()

  const optionsFn = (titleName, show) => {
      return {
            title: titleName, headerShown: show,
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
            headerRight: () => (<LogoutButton/>)
          }
  }

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="Registration" component={RegistrationScreen} options={optionsFn("Реєстрація", false)} />
        <MainStack.Screen name="Login" component={LoginScreen} options={optionsFn("Авторизація", false)}/>
        <MainStack.Screen name="Posts" component={PostsScreen} options={optionsFn("Пости", false)}/>
        <MainStack.Screen name="Home" component={Home} options={optionsFn("Home", false)} />
        <MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} options={optionsFn("Новий пост", false)}/>
        <MainStack.Screen name="CommentsScreen" component={CommentsScreen} options={optionsFn("Коментарі", false)} />
        <MainStack.Screen name="ProfileScreen" component={ProfileScreen} options={optionsFn("Профіль", false)}/>
        <MainStack.Screen name="MapScreen" component={MapScreen} options={optionsFn("MapScreen", false)} />
        </MainStack.Navigator>
      </NavigationContainer>
 </>
  );
}

