import React, { useEffect, useState } from 'react';
import { dataBase } from '~/firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(dataBase, collectionName), orderBy('createdAt', 'asc'));
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt', 'desc'),
      );
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
