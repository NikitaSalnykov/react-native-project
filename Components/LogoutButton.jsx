import React from 'react'
import LogoutIcon from "../assets/svg/logout.svg";
import { useNavigation, TouchableOpacity } from "@react-navigation/native";
import { StyleSheet, TouchableOpacityComponent } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/authSlice';


const LogoutButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

    const handleLogOut = () => {
    dispatch(removeUser())
    navigation.navigate("Login");
    console.log("Logout complete");  
  };
  
  return (
    <LogoutIcon style={styles.logout} onPress={handleLogOut}/>
  )
}

const styles = StyleSheet.create({
  logout: {
        marginRight: 16,

  },
});



export default LogoutButton
