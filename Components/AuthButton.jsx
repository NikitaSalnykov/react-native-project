import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

const AuthButton = ({name, text, auth}) => {
  return (
        <View style={[styles.authContainer, { paddingBottom: auth === "Увійти" ? 78 : 144  }]}>
          <View style={styles.buttonWrapper}>
          <Button onPress={() => { }} color={'#F6F6F6'} title={name} />
          </View>
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
  authContainer: {
    width: "100%",
    display: 'flex',
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16
  }

});
