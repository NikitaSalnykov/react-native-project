import { useNavigation } from '@react-navigation/native';
import React from 'react'
import Back from "../assets/svg/back.svg";
import { TouchableOpacity } from 'react-native-gesture-handler';

const BackPageButton = () => {
  const navigation = useNavigation();
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack} style={{ marginLeft: 10 }}>
    <Back />
    </TouchableOpacity>
  )
}

export default BackPageButton