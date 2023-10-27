
import { collection, doc, deleteDoc, getDocs, addDoc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from "../config";

export  const getDataFromFirestore = async (userId) => {
      try {
        const snapshot = await getDocs(collection(db, 'posts'));
        const postData = snapshot.docs.map((doc) => ({ postId: doc.id, ...doc.data() }));
        const filteredPosts = postData.filter(el => el.authorId === userId).sort((a, b) => b.timestamp - a.timestamp)
        return filteredPosts
      } catch (error) {
        console.log(error);
        throw error;
      }
    };


    export  const deleteDataFromFirestore = async (collectionName, docId) => {
      try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log("Document deleted successfully");
      } catch (error) {
        console.error("Error deleting document:", error);      }
      }

      export const writeDataToFirestore = async (photoDescription, locationName, photo, location, id, timestamp) => {
        try {
          const docRef = await addDoc(collection(db, 'posts'), {
            photoDescription, locationName, photo, location, authorId: id, timestamp, likes: [],
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