import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsIcon from "../../assets/svg/posts.svg"
import ProfileIcon from "../../assets/svg/profile.svg"
import AddIcon from "../../assets/svg/newPost.svg"
import PostsScreen from "../PostsScreen/PostsScreen"
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen"
import ProfileScreen from "../ProfileScreen/ProfileScreen"
import LogoutButton from "../../Components/LogoutButton";

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

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
       initialRouteName="Posts" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            const buttonStyles = {
            backgroundColor: focused ? "#FF6C00" : "transparent",
            borderRadius: 20, 
            width: 70,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          };

          if (route.name === "Posts") {
            return (<View style={buttonStyles}>
              <PostsIcon color={focused ? "white" : "#212121CC"} />
            </View>)
          } if (route.name === "NewPost") {
             return <View style={buttonStyles}><AddIcon  color={focused ? "white" : "#212121CC"} /></View>
          } else if (route.name === "Profile") { 
          return <View style={buttonStyles}><ProfileIcon  color={focused ? "white" : "#212121CC"} /></View>
          }
        },
        
          tabBarStyle: {
          height: 83,
          paddingBottom: 10,
          paddingTop: 10,
          paddingHorizontal: "23%",
          textAlign: "center",
        },
          tabBarShowLabel: false,
          screenOptions: {

          }
      })}


        
    >
      <Tabs.Screen name="Posts" component={PostsScreen}  options={optionsFn("Публікації", true)}/>
      <Tabs.Screen name="NewPost" component={CreatePostsScreen} options={optionsFn("Створити публікацію", true)}/>
      <Tabs.Screen name="Profile" component={ProfileScreen} options={optionsFn("Профіль", false)}/>
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
