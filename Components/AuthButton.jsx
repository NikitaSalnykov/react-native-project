import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AuthButton = ({name, text, auth, handleSubmit}) => {
  return (
        <View style={[styles.authContainer, { paddingBottom: auth === "Увійти" ? 144 : 78  }]}>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper}>
        <Text style={styles.button} title={name}>Зареєструватися</Text>
          </TouchableOpacity>
      <Text style={styles.loginText}>{text} <Text style={{textDecorationLine: 'underline'}}>{auth}</Text></Text>
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
    backgroundColor: "#f4f4f4"
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16
  }

});
