import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from '@react-navigation/native';

const PhoneCamera = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();

useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync (); 
    await MediaLibrary.requestPermissionsAsync();

    setHasPermission(status === "granted");
  })();
}, []);

    if (hasPermission === null) {
    return <View />;
    }
  
   if (hasPermission === false) {
    return <Text>No access to camera</Text>;
   }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={setCameraRef}
      >
       <View style={{ width: "100%", height: "20%", position: 'absolute', top: 0, backgroundColor: 'black' , opacity: 0.8}}></View>
        <View style={{ width: "100%", height: "20%", position: 'absolute', bottom: 0, backgroundColor: 'black', opacity: 0.8 }}></View>
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 30, marginBottom: 10, color: "white"}}>
              ↺
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                navigation.navigate("NewPost", { cameraPhoto: uri,  });
              }
            }}>
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  camera: { flex: 1,},
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    position: 'absolute',
    bottom: 40, right: 40,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center", marginBottom: 40 },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default PhoneCamera