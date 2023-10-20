import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const location = route.params?.location
  const locationName = route.params?.locationName || ''
  const backToPage = route.params?.back || 'Home'

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 60, left: 20, zIndex: 40, backgroundColor: "white", padding: 10, borderRadius: 100, borderColor: "black", borderWidth: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate(backToPage)}>
          <Text style={{ fontSize: 24, color: 'black' }}>Назад</Text>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker title={locationName} coordinate={location} description=""  />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
