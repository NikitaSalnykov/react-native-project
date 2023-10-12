import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import AddPhoto from "../../assets/svg/add.svg";
import AuthButton from '../../Components/AuthButton';
import Container from '../../Components/Container';

function RegistrationScreen() {
  return (
    <>
    <Container pt={92}>
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
      </Container>
          <AuthButton name={'Зареєструватися'} text={'Вже є акаунт?'} auth={'Увійти'} />
    </>
  )
}

const styles = StyleSheet.create({
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
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    padding: 16,
  },
  showPassword: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 16,
  },
});


export default RegistrationScreen
