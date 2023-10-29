import { storage } from "../config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

export const uploadAvatarToStorage = async (imageUri, login) => {
  try {
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { compress: 0.9, format: "jpeg" }
    );

    const blob = await fetch(resizedPhoto.uri).then((response) =>
      response.blob()
    );

    const photoName = `${login}${Date.now()}.jpg`;
    const imageRef = ref(storage, `avatars/${photoName}`);
    const uploadTaskSnapshot = await uploadBytes(imageRef, blob);

    const imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    return { imageUrl, photoName };
  } catch (error) {
    console.error("Error uploading image to Firebase Storage", error);
    return null;
  }
};

export const deleteAvatarFromStorage = async (fileName) => {
  try {
    const imageRef = ref(storage, `avatars/${fileName}`);
    await deleteObject(imageRef);
    console.log("Файл успешно удален.");
    return true; // Возвращаем true для обозначения успешного удаления
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    return false; // Возвращаем false в случае ошибки
  }
};
