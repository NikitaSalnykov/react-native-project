import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../Components/Container'

const LoginScreen = () => {
  return (
    <Container>
      <View style={styles.profileContainer}>
        <View style={styles.avatarBox}></View>
        <View>
          <Text style={[styles.text, {fontWeight: 700, fontSize: 16,}]}>Nikita Salnikov</Text>
          <Text style={[styles.text, { fontSize: 11, opacity: 0.8}]}>nikita@gmail.com</Text>
        </View>
      </View>
    </Container>
  )
}


const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  avatarBox: {
    width: 60,
    height: 60,
    backgroundColor: "gold",
    borderRadius: 13
  },
  text: {
    color: '#212121',
    fontFamily: "Roboto-Regular"
  }
});


export default LoginScreen