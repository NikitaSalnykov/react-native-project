import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TextInput,
} from "react-native";
import Container from "../../Components/Container";

const CommentsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const photo = route.params?.photo || null;
  console.log(route.params);

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
            <Image
              source={{ uri: photo }}
              resizeMode="cover"
              style={[{ height: "100%", width: "100%" }]}
            />
          </View>
          <View style={{ marginTop: 34, width: "100%" }}>
            <View
              style={[
                {
                  gap: 16,
                  flexDirection: "row",
                  width: "100%",
                },
                false && { flexDirection: "row-reverse" },
              ]}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  backgroundColor: "black",
                }}
              ></Image>
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
                  false && {
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
                  dasdasda
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 10,
                    color: "#BDBDBD",
                  }}
                >
                  dasdasda
                </Text>
              </View>
            </View>
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
                borderRadius: 20,
                backgroundColor: "#E8E8E8",
                borderWidth: 1,
                borderColor: "silver",
                justifyContent: "center",
                padding: 16,
                paddingTop: 12,
              }}
            >
              <TextInput
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
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
};

export default CommentsScreen;
