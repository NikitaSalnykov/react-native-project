import background from "../assets/background.png";
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import AuthButton from "./AuthButton";

const Container = ({pt, children}) => {
  return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={background} imageStyle={styles.customImageStyle} resizeMode='cover' style={{flex: 1, justifyContent:'flex-end' }} >
      <View style={{position: 'absolute', width: "100%", height: 200, backgroundColor: "white"}}></View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
              <View style={[styles.container, { paddingTop: pt, position: 'relative'}]}>

        {children}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
              </TouchableWithoutFeedback>
  )
}

export default Container


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
  },
  customImageStyle: {
  },
})