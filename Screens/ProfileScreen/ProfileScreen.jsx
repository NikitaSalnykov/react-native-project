import React from "react";
import background from "../../assets/background.png";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, View } from "react-native";
import RemovePhoto from "../../assets/svg/remove.svg";
import CommentIcon from "../../assets/svg/comment.svg";
import LikeIcon from "../../assets/svg/like.svg";
import GeoIcon from "../../assets/svg/geo.svg";
import LogoutButton from "../../Components/LogoutButton";
import { useSelector } from "react-redux";
import placeholderAvatar from "../../assets/emptyAvatar.png";
import Trash from "../../assets/svg/trash.svg";
import { useAuth } from "../../hooks/useAuth";

// import LogoutIcon from '../../assets/svg/logout.svg'

const ProfileScreen = () => {
  const avatar = useSelector((state) => state.auth.avatar);
  const userName = useSelector((state) => state.auth.userName);
  const posts = useSelector((state) => state.posts.posts);
  const { id: userId, email } = useAuth();

  console.log(posts);
  console.log(1);
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "flex-start" }}
    >
      <View style={styles.container}>
        <View style={{ position: "absolute", top: 22, right: 16 }}>
          <LogoutButton />
        </View>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{ width: "100%", flex: 1, borderRadius: 16 }}
            />
          ) : (
            <Image
              source={placeholderAvatar}
              style={{ width: "100%", flex: 1, borderRadius: 16 }}
            />
          )}
          <View style={styles.dowloadAvatarWrapper}>
            <RemovePhoto
              style={{ fill: "gray", transform: [{ rotate: "45deg" }] }}
            />
          </View>
        </View>
        <Text style={styles.title}>{userName}</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{ gap: 40, paddingBottom: 80 }}>
            {posts.map((el) => (
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
                    source={{
                      uri:
                        el?.photo ||
                        "https://info.renome.ua/wp-content/uploads/2021/09/placeholder.png",
                    }}
                    resizeMode="cover"
                    style={[
                      { height: "100%", width: "100%" },
                      !el.photoDescription && { marginBottom: 16 },
                    ]}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      padding: 10,
                      opacity: 0.7,
                    }}
                    onPress={() =>
                      handleDelete("posts", el.postId, el.photoName)
                    }
                  >
                    <Trash style={{ color: "white" }} />
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
                          postId: el.postId,
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
                      style={[
                        {
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        },
                      ]}
                      onPress={() => {
                        handleLike("posts", el.postId, userId);
                      }}
                    >
                      <LikeIcon
                        style={
                          el.likes.includes(userId)
                            ? { color: "#FF6C00" }
                            : { color: "#FF6C00", opacity: 0.6 }
                        }
                      />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: -60 }],
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
        translateX: 10,
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
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default ProfileScreen;
