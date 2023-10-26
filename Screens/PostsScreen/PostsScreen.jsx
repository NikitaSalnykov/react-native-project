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
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from "../../config";
import { useAuth } from '../../hooks/useAuth';


const PostsScreen = () => {
  const route = useRoute();
  const newPost = route.params?.newPost || null;
  const {id: userId} = useAuth()
  const [POSTS, setPOSTS] = useState([]);

  const navigation = useNavigation();

     const getDataFromFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'posts'));
        const postData = snapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }));
        const filteredPosts = postData.filter(el => el.authorId === userId).sort((a, b) => b.timestamp - a.timestamp)
        setPOSTS(filteredPosts); // Обновляем состояние POSTS с полученными данными
        console.log(POSTS);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

  useEffect(() => {
    getDataFromFirestore();
    console.log(POSTS);
  }, [newPost]);

  const handleMap = (location, locationName) => {
    navigation.navigate("Map", { location, locationName, back: "Home" });
  };

  return (
    <Container>
      <View style={[styles.profileContainer]}>
        <View style={styles.avatarBox}></View>
        <View>
          <Text style={[styles.text, { fontWeight: 700, fontSize: 16 }]}>
            Nikita Salnikov
          </Text>
          <Text style={[styles.text, { fontSize: 11, opacity: 0.8 }]}>
            nikita@gmail.com
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
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <LikeIcon />
                      <Text style={styles.text}>0</Text>
                    </View>
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
