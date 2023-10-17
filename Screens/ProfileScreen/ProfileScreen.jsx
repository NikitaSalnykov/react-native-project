import React from 'react'
import background from "../../assets/background.png";
import { ImageBackground, ScrollView, Text } from 'react-native'
import { StyleSheet, View } from 'react-native'
import RemovePhoto from "../../assets/svg/remove.svg";
import CommentIcon from '../../assets/svg/comment.svg'
import LikeIcon from '../../assets/svg/like.svg'
import GeoIcon from '../../assets/svg/geo.svg'
import LogoutButton from '../../Components/LogoutButton';
// import LogoutIcon from '../../assets/svg/logout.svg'


const ProfileScreen = () => {
  return (
    <ImageBackground source={background} resizeMode='cover' style={{ flex: 1, justifyContent: 'flex-start' }} >
      <View style={styles.container}>
        <View style={{ position: 'absolute', top: 22, right: 16 }}>
          <LogoutButton />
        </View>
      <View style={styles.avatarContainer}>
          <View style={styles.dowloadAvatarWrapper}>
          <RemovePhoto style={{fill: 'gray', transform:  [{ rotate: '45deg' }]}} />
          </View>
        </View>
        <Text style={styles.title}>Nikita Salnykov</Text>
        <ScrollView  showsVerticalScrollIndicator={false} >
          <View style={{gap: 40, paddingBottom: 150}}>
            <View style={styles.postsContainer}>
            <View style={[styles.photoWrapper]}></View>
            <Text style={[styles.text ,{paddingTop: 8, paddingBottom: 8}]}> Example</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{flexDirection: 'row', gap: 24}}>
                  <View style={{ flexDirection: 'row', gap: 6,  alignItems: 'center'  }}>
                    <CommentIcon />
                    <Text style={styles.text}>8</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center'  }}>
                    <LikeIcon />
                  <Text style={styles.text}>103</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <GeoIcon />
                  <Text style={[styles.text, {textDecorationLine: 'underline'}]}>Spain</Text>
                </View>
            </View>
            </View>


                <View style={styles.postsContainer}>
            <View style={[styles.photoWrapper]}></View>
            <Text style={[styles.text ,{paddingTop: 8, paddingBottom: 8}]}> Example</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{flexDirection: 'row', gap: 24}}>
                  <View style={{ flexDirection: 'row', gap: 6,  alignItems: 'center'  }}>
                    <CommentIcon />
                    <Text style={styles.text}>8</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center'  }}>
                    <LikeIcon />
                  <Text style={styles.text}>103</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <GeoIcon />
                  <Text style={[styles.text, {textDecorationLine: 'underline'}]}>Spain</Text>
                </View>
            </View>
            </View>
                <View style={styles.postsContainer}>
            <View style={[styles.photoWrapper]}></View>
            <Text style={[styles.text ,{paddingTop: 8, paddingBottom: 8}]}> Example</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{flexDirection: 'row', gap: 24}}>
                  <View style={{ flexDirection: 'row', gap: 6,  alignItems: 'center'  }}>
                    <CommentIcon />
                    <Text style={styles.text}>8</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center'  }}>
                    <LikeIcon />
                  <Text style={styles.text}>103</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <GeoIcon />
                  <Text style={[styles.text, {textDecorationLine: 'underline'}]}>Spain</Text>
                </View>
            </View>
            </View>
            

         </View>
        </ScrollView>

        </View>
      
    </ImageBackground>
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
    container: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
      height: '100%',
    marginTop: 147,
    paddingLeft: 16,
    paddingRight: 16,
      alignItems: "center",
      paddingTop: 92,
  },
  postsContainer: {
    width: 343,
    height: 299,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16
  },
  photoWrapper: {
    borderRadius: 16,
    backgroundColor: "green",
     height: 240,
  },
  text: {
    color: '#212121', fontFamily: "Roboto-Regular", fontSize: 16
  }
});


export default ProfileScreen