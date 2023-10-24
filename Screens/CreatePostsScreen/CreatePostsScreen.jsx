import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, TouchableOpacity, Image } from 'react-native';
import Container from '../../Components/Container';
import PhotoIcon from '../../assets/svg/camera.svg';
import GeoIcon from '../../assets/svg/geo.svg';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Trash from '../../assets/svg/trash.svg'
import * as Location from "expo-location";
import axios from 'axios';

const CreatePostsScreen = () => {
  const route = useRoute();

  const [photoDescription, setPhotoDescription] = useState('');
  const [photo, setPhoto] = useState(route.params ? route.params.cameraPhoto : null);
  const [geo, setGeo] = useState('');

  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      }
       
      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000 },
        (newLocation) => {
          const coords = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          };
          setLocation(coords);
        }
      );


      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  useEffect(() => {
    if (location) {
      axios
        .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`)
        .then((response) => {
          if (response.data) {
            const address = `${response.data.address.road}, ${response.data.address.city}`;
            setLocationName(address);
          }
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    }
  }, [location]);

  useEffect(() => {
  if (route.params) {
    setPhoto(route.params.cameraPhoto);
    if (location) {
    setGeo(locationName)
    console.log(geo);
    }
  }
  }, [route.params])

  const handleDescription = (e) => {
    setPhotoDescription(e)
  }

  const handleSubmit = () => {
    const newPost = {
      photoDescription, locationName, photo, location, postId: photo.slice(0, -6)
    }
    console.log(photo.slice(-35, -4));
    setPhotoDescription(''),
    setGeo('')
    setPhoto(null)
    navigation.navigate("Posts", {newPost})
  };

  const handleCamera = () => {
    navigation.navigate("Camera")
  };

  const handleMap = () => {
    navigation.navigate("Map", {location, locationName, back: "NewPost"})
  };


  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={{ marginBottom: 32, ali: 'center', width: '100%'}} >
          <TouchableOpacity onPress={handleCamera} >
            <View style={{ width: '100%', height: 240, backgroundColor: '#E8E8E8', borderRadius: 8, position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: 8, overflow: 'hidden' }}>
            {photo && 
            <Image source={{ uri: photo }} resizeMode='cover' style={{ flex: 1, width: "100%", }} />}
              <View style={[{ position: 'absolute', width: 60, height: 60, borderRadius: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }, photo && {opacity: 0.4, backgroundColor: "silver"}]}>
                <PhotoIcon style={[{ color: 'silver' }, photo && {color: "white"}]} />
              </View>    
            </View>
            </TouchableOpacity>
          <Text style={[styles.text, { color: '#BDBDBD' }]}>
          {photo ? "Редагувати фото" : "Завантажте фото"}</Text>
          </View>
      </TouchableWithoutFeedback>
      <View style={{ gap: 16, marginBottom: 32, width: '100%' }}>
        <TextInput value={photoDescription} style={[styles.input, styles.text]} placeholder='Назва...' onChangeText={handleDescription}></TextInput>
        <View>
        <TouchableOpacity onPress={photo ? handleMap : () => {} }>
  <View style={{width: "100%", borderBottomWidth: "1", borderColor: "#eeeeee"}}>
    <Text
      style={[styles.input, styles.text, { paddingLeft: 28 }, !locationName && {color: '#BDBDBD'}]}
      placeholder='Місцевість...'
    >
      {locationName ? `${locationName}` : `Місцевість...`}
    </Text>
    <GeoIcon style={{ position: 'absolute', top: 11 }} />
  </View>
  <View>

  </View>
</TouchableOpacity>
          
        </View>
      </View>
      <TouchableOpacity onPress={photo ? handleSubmit : null} style={[styles.buttonWrapper, !photo && { backgroundColor: '#F6F6F6' }]}>
        <Text style={[styles.button, !photo && { color: '#BDBDBD' }]} title={'Опубліковати'}>
          Опубліковати
        </Text>
      </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {setPhotoDescription(''), setGeo(''), setPhoto(null)}} style={{flex: 1, position: "absolute", bottom: 30, left: "45%"}}>
              <View style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 23, paddingRight: 23, backgroundColor: "#F6F6F6", borderRadius: 50, }}>
  <Trash style={{color: 'silver'}}/>
  </View>
              </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  input: {
    position: 'relative',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderStyle: 'solid',
    padding: 16,
  },
  buttonWrapper: {
    fontFamily: 'Roboto-Regular',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: "white"
  },
});

export default CreatePostsScreen;
