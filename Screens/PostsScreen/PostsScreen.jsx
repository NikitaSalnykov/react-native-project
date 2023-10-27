import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../../Components/Container";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommentIcon from "../../assets/svg/comment.svg";
import LikeIcon from "../../assets/svg/like.svg";
import GeoIcon from "../../assets/svg/geo.svg";
import { collection, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore'; 
import { db } from "../../config";
import { useAuth } from '../../hooks/useAuth';
import Trash from "../../assets/svg/trash.svg";
import { deleteDataFromFirestore, getDataFromFirestore, getLikesFromFirestore } from "../../helpers/firebasePosts";
import { useSelector } from "react-redux";



const PostsScreen = () => {
  const route = useRoute();
  const newPost = route.params?.newPost || null;
  const {id: userId, email} = useAuth()
  const userName = useSelector(state => state.auth.userName)
  const [POSTS, setPOSTS] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const filteredPosts = await getDataFromFirestore(userId);
      setPOSTS(filteredPosts);
    };
  
    fetchData();
  }, [newPost]);

  const handleDelete = async (collectionName, docId) => {
    await deleteDataFromFirestore(collectionName, docId)
    const filteredPosts = await getDataFromFirestore(userId);
    setPOSTS(filteredPosts);
    };

  const handleMap = (location, locationName) => {
    navigation.navigate("Map", { location, locationName, back: "Home" });
  };

  const handleLike = async (collectionName, docId, userId) => {
    await getLikesFromFirestore(collectionName, docId, userId)
    const filteredPosts = await getDataFromFirestore(userId);
    setPOSTS(filteredPosts);
  }


  return (
    <Container>
      <View style={[styles.profileContainer]}>
        <View style={styles.avatarBox}></View>
        <View>
          <Text style={[styles.text, { fontWeight: 700, fontSize: 16 }]}>
            {userName}
          </Text>
          <Text style={[styles.text, { fontSize: 11, opacity: 0.8 }]}>
            {email}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 34,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{ gap: 40, paddingBottom: 80 }}>
            {POSTS.map((el) => (
              <View style={styles.postsContainer} key={el.postId}>
                <View
                  style={[
                    {
                      width: "100%",
                      height: 240,
                      borderRadius: 8,
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      marginBottom: 8,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: el?.photo || "https://info.renome.ua/wp-content/uploads/2021/09/placeholder.png"}}
                    resizeMode="cover"
                    style={[
                      { height: "100%", width: "100%" },
                      !el.photoDescription && { marginBottom: 16 },
                    ]}
                  />
                  <TouchableOpacity style={{position: "absolute", top: 0, right: 0, padding: 10, opacity: 0.7}} onPress={() => handleDelete('posts', el.postId)}> 
                  <Trash style={{color: "white"}} />
                  </TouchableOpacity>
                </View>
                {el.photoDescription && (
                  <Text
                    style={[styles.text, { paddingTop: 8, paddingBottom: 8 }]}
                  >
                    {el.photoDescription}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 24 }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          photo: el.photo,
                          postId: el.postId
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <CommentIcon />
                        <Text style={styles.text}>0</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }]} onPress={()=>{handleLike('posts', el.postId, userId)}}
                    >
                      <LikeIcon style={el.likes.includes(userId) ? { color : "#FF6C00" } : {color : "#FF6C00", opacity: 0.6}}/>
                      <Text style={styles.text}>{el.likes.length}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleMap(el.location, el.locationName);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      {el.locationName && <GeoIcon />}
                      <Text
                        style={[
                          styles.text,
                          { textDecorationLine: "underline" },
                        ]}
                      >
                        {el.locationName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatarBox: {
    width: 60,
    height: 60,
    backgroundColor: "gold",
    borderRadius: 13,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
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
    height: "100%",
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
    borderTopLeftRadius: 16,
  },
  photoWrapper: {
    borderRadius: 16,
    backgroundColor: "green",
    height: 240,
  },
});

export default PostsScreen;
