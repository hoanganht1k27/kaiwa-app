import { orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/firebase/config';

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collectionName).orderBy('createdAt', 'asc');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
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
