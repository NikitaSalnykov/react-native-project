import React from 'react'
import { StyleSheet, View } from 'react-native'

const Container = ({children}) => {
  return (
    <View style={[styles.container, {flex: 1}]}>
      {children}
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    alignItems: "start",
    
  },
  customImageStyle: {
  },
})

export default Container