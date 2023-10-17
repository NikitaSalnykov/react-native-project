import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput,  View } from 'react-native'
import AddPhoto from "../../assets/svg/add.svg";
import { useNavigation } from '@react-navigation/native';
import Container from '../../Components/AuthWrapper';
import AuthButton from '../../Components/AuthButton';

function RegistrationScreen() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inValidLogin, setinValidLogin] = useState(false);
  const [inValidEmail, setinValidEmail] = useState(false);
  const [inValidPassword, setinValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [disabled, setDisable] = useState(true)
  const navigation = useNavigation();

  useEffect(() => {
    if (login && email && password) setDisable(false)
  }, [login, email, password])
  

  
  const handleSubmit = () => {
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
    if (inValidEmail) {
      Alert.alert('Error', `${email} має неправильний формат email`);
      return;
    }

     if (inValidPassword) {
       Alert.alert('Error', 'Пароль має містити від 6 символів');
             setinValidPassword(true)
      return;
    }

     if (inValidLogin) {
       Alert.alert('Error', 'Логін має містити від 2 символів');
       setinValidLogin(true)
      return;
    }

    console.log({
      login: login.trim(), email: email.trim(), password: password.trim()
    });

    setDisable(true)
    navigation.navigate("Home")
  }

  const onChangeLogin = (event) => {
    setLogin(event)

  }
  const onChangeEmail = (event) => {
    setEmail(event)
  }
  const onChangePassword = (event) => {
    setPassword(event)
  }

const checkValidLogin = () => {
    if (login.length < 2) {
        return setinValidLogin(true);
      } else {
        return setinValidLogin(false);
  }
  };
  const checkValidEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

 if (!emailRegex.test(email)){
        return setinValidEmail(true);
      } else {
        return setinValidEmail(false);
  }
};
  const checkValidPassword = () => {
    if (password.length < 6) {
        return setinValidPassword(true);
      } else {
       return  setinValidPassword(false);
  }
};

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
        <TextInput value={login} name="login" style={[styles.input, inValidLogin && styles.inputInvalid]} placeholder='Логін' onChangeText={onChangeLogin} onBlur={checkValidLogin}></TextInput>
        <TextInput value={email} style={[styles.input, inValidEmail && styles.inputInvalid]} placeholder='Адреса електронної пошти' onChangeText={onChangeEmail} onBlur={checkValidEmail}></TextInput>
        <View>
          <TextInput secureTextEntry={!showPassword} value={password} style={[styles.input, inValidPassword && styles.inputInvalid]} placeholder='Пароль' onChangeText={onChangePassword} onBlur={checkValidPassword}></TextInput>
            <Text style={styles.showPassword} onPress={() => {setShowPassword(!showPassword)}}>Показати</Text>
          </View>
        </View>
    </Container>
      <AuthButton name={'Зареєструватися'} text={'Вже є акаунт?'} auth={'Увійти'} handleSubmit={handleSubmit} disabled={disabled} /></>
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
  inputInvalid: {
   borderColor: 'red' 
  },
  showPassword: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 16,
  },
});


export default RegistrationScreen
