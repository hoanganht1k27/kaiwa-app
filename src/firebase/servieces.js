import { dataBase } from './config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const addDocument = async (collectionName, data) => {
  await addDoc(collection(dataBase, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
  });
};
