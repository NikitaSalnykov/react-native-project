import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Container from "../../Components/Container";
import SendIcon from "../../assets/svg/send.svg";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
  getCommentsDataFromFirestore,
  getPostDataFromFirestore,
  writeCommentToFirestore,
} from "../../helpers/firebaseComments";
import placeholderAvatar from "../../assets/emptyAvatar.png";

const CommentsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id: userId } = useAuth();
  const userName = useSelector((state) => state.auth.userName);
  const avatar = useSelector((state) => state.auth.avatar);
  const postId = route.params?.postId || null;
  const [inputText, setInputText] = useState("");
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [postIsLoading, setPostIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getPostDataFromFirestore(postId);
      setPostIsLoading(false);
      setPost(postData);
      setComments(postData.comments || []);
    };

    fetchPost();
    console.log(post.comments);
  }, []);

  const onChangeComment = (event) => {
    setInputText(event);
  };

  const handleSubmit = async () => {
    await writeCommentToFirestore(postId, inputText, userName, userId);
    setInputText("");
    const postData = await getPostDataFromFirestore(postId);
    setComments(postData.comments);
  };

  return (
    <Container>
      <View style={{ width: "100%", justifyContent: "space-between", flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            style={[
              {
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
            {!postIsLoading ? (
              <Image
                source={{ uri: post.photo }}
                resizeMode="cover"
                style={[
                  {
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#bdbdbd73",
                  },
                ]}
              />
            ) : (
              <Text>Loading</Text>
            )}
          </View>
          <View style={{ marginTop: 34, width: "100%" }}>
            {comments && (
              <View style={{ gap: 16 }}>
                {comments.map((el) => (
                  <View
                    style={[
                      { flexDirection: "row", width: "100%", gap: 16 },
                      el.userId === userId && {
                        flexDirection: "row-reverse",
                      },
                    ]}
                    key={el.timestamp}
                  >
                    {avatar ? (
                      <Image
                        source={{ uri: avatar.imageUrl }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 50,
                          backgroundColor: "black",
                        }}
                      ></Image>
                    ) : (
                      <Image
                        source={placeholderAvatar}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 50,
                          backgroundColor: "black",
                        }}
                      />
                    )}
                    <View
                      style={[
                        {
                          backgroundColor: "#F6F6F6",
                          padding: 16,
                          width: "85%",
                          height: "100%",
                          borderRadius: 10,
                          borderTopLeftRadius: 0,
                        },
                        el.userId === userId && {
                          borderTopRightRadius: "row-reverse",
                          borderTopLeftRadius: 10,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Roboto-Regular",
                          fontSize: 16,
                          marginBottom: 8,
                        }}
                      >
                        {el.text}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Roboto-Regular",
                          fontSize: 10,
                          color: "#BDBDBD",
                        }}
                      >
                        {el.authorName}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={110}
        >
          <View
            style={{
              paddingTop: 16,
              paddingBottom: 26,
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                borderRadius: 50,
                backgroundColor: "#E8E8E8",
                borderWidth: 1,
                borderColor: "silver",
                justifyContent: "center",
                padding: 16,
                paddingTop: 12,
                paddingRight: 0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                value={inputText}
                onChangeText={onChangeComment}
                placeholder="Коментувати"
                style={{
                  width: "80%",
                }}
                multiline={true} // Разрешаем многострочный ввод
                numberOfLines={4} // Максимальное количество видимых строк
                textAlignVertical="top" // Выравнивание текста вверху
                autoGrow={true} // Для автоматического изменения высоты
                scrollEnabled={true} // Разрешаем прокрутку, если текст не помещается
              ></TextInput>
              <TouchableOpacity onPress={handleSubmit}>
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 50,
                    backgroundColor: "#FF6C00",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SendIcon style={{ color: "white" }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
};

export default CommentsScreen;
