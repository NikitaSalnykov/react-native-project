import React from 'react'
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthButton = ({ name, text, auth, handleSubmit, disabled }) => {
  const navigation = useNavigation();

  return (
        <View style={[styles.authContainer, { paddingBottom: auth === "Зареєструватися" ? 144 : 78  }]} 
>
          <TouchableOpacity onPress={!disabled ? handleSubmit : null} style={[styles.buttonWrapper, disabled && {backgroundColor: '#BDBDBD'}]} >
        <Text style={styles.button} title={name}>{name}</Text>
          </TouchableOpacity>
      <Text style={styles.loginText}>{text} <Text style={{ textDecorationLine: 'underline' }}
        onPress={() => navigation.navigate(name === "Зареєструватися" ? "Login" : "Registration")}>{auth}</Text></Text>
        </View>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  buttonWrapper: {
    fontFamily: "Roboto-Regular",
    width: "100%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  button: {
    color: "#f4f4f4",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  authContainer: {
    width: "100%",
    display: 'flex',
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16
  }

});
