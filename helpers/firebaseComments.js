import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

export const getPostDataFromFirestore = async (id) => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    const postsData = snapshot.docs.map((doc) => ({
      postId: doc.id,
      ...doc.data(),
    }));
    const post = postsData.filter((el) => el.postId === id);
    return post[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const writeCommentToFirestore = async (
  docId,
  text,
  authorName,
  userId
) => {
  try {
    const ref = doc(db, "posts", docId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const comments = data.comments || [];

      const newComment = {
        text,
        authorName,
        userId,
        timestamp: new Date(),
      };

      const updatedComments = [...comments, newComment];

      await updateDoc(ref, {
        comments: updatedComments,
      });

      console.log("Document updated with the new comment.");
    } else {
      console.log("Document does not exist.");
    }
  } catch (error) {
    console.log("Error updating document:", error);
  }
};

export const getCommentsDataFromFirestore = async (docId) => {
  try {
    const ref = doc(db, "posts", docId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const comments = data.comments || [];

      const sortedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
      return sortedComments;
    } else {
      console.log("Document does not exist.");
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getCommentsFromFirestore = async (id) => {
//   try {
//     const snapshot = await getDocs(collection(db, "comments"));
//     // const commentsData = snapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }));
//     const commentsData = snapshot
//       .filter((el) => el.postId === id)
//       .sort((a, b) => b.timestamp - a.timestamp);
//     return commentsData;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
