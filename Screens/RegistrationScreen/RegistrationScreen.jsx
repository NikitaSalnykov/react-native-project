import React from 'react'
import { Button, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import AddPhoto from "../../assets/svg/add.svg";
import background from "../../assets/background.png";

function RegistrationScreen() {
  return (
    <ImageBackground source={background} resizeMode="cover" style={{
      flex: 1, justifyContent: 'flex-end',
    }}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.dowloadAvatarWrapper}>
            <AddPhoto/>
          </View>
        </View>
          <Text style={styles.title}>Реєстрація</Text>
            <View style={{display: "flex", gap: 16, marginBottom: 43, width: "100%"}}>
              <TextInput style={styles.input} placeholder='Логін'></TextInput>
              <TextInput style={styles.input} placeholder='Адреса електронної пошти'></TextInput>
              <View>
                  <TextInput style={styles.input} placeholder='Пароль'></TextInput>  
                  <Text style={styles.showPassword}>Показати</Text>
              </View>
            </View>
        <View style={styles.authContainer}>
          <View style={styles.buttonWrapper}>
          <Button onPress={() => { }} color={'#F6F6F6'} title="Зареєстуватися" />
          </View>
          <Text style={styles.loginText}>Вже є акаунт? <Text>Увійти</Text></Text>
        </View>
        
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 110,
    paddingTop: 92,
  },
  avatarContainer: {
    position: "absolute",
    top: 0,
     transform: [
    { translateY: -60 },
  ],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  dowloadAvatarWrapper: {
    width: 25,
    height: 20,
    position: "absolute",
    bottom: 14,
    right: 0,
    transform: [
      {
        translateX: 10
      },
  ],
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    marginBottom: 32,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    position: 'relative',
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    padding: 16,
  },
  showPassword: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 16,
  },
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
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16
  }


});


export default RegistrationScreen