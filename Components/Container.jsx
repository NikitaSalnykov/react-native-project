import background from "../assets/background.png";
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

const Container = ({pt, children}) => {
  return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={background} resizeMode="cover" style={{
      flex: 1, justifyContent: 'flex-end',
      }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      style>
      <View style={[styles.container, { paddingTop: pt}]}>

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
    justifyContent: "flex-end",
  },
})