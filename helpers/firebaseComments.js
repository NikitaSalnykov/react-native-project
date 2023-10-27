
import { collection, doc, deleteDoc, getDocs, addDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from "../config";

const timestamp = serverTimestamp();


export  const getPostDataFromFirestore = async (id) => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    const postsData = snapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }));
    const post = postsData.filter(el => el.postId === id)
    return post[0]
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export  const getCommentsFromFirestore = async (id) => {

      try {
        const snapshot = await getDocs(collection(db, 'comments'));
        // const commentsData = snapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }));
        const commentsData = snapshot.filter(el => el.postId === id).sort((a, b) => b.timestamp - a.timestamp)
        return commentsData
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    
    export const writeCommentToFirestore = async (authorId, authorName, text, postId) => {
      try {
        const docRef = await addDoc(collection(db, 'comments'), {
          authorId, authorName, text, postId, timestamp,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        throw new Error('Error adding document: ' + e.message);
      }
    };

          export const getLikesFromFirestore = async (collectionName, docId, userId) => {
        try {
          const ref = doc(db, collectionName, docId);
          const docSnapshot = await getDoc(ref);
      
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const likes = data.likes || []; 
           
            if (likes.includes(userId)) {
              const indexToRemove = likes.indexOf(userId);
              likes.splice(indexToRemove, 1);
              console.log('Remove like')
            } else {
            likes.push(userId);
          }

            await updateDoc(ref, {
              likes 
            });
      
            console.log("Document updated with the new like.");
          } else {
            console.log("Document does not exist.");
          }
        } catch (error) {
          console.log("Error updating document:", error);
        }
      }