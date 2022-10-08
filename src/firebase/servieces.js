import { Timestamp } from 'firebase/firestore';
import { db } from './config';
import firebase from './config';

export const addDocument = async (collectionName, data) => {
  await db.collection(collectionName).add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
