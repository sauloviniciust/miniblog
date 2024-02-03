import {  useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Document } from "./../Interface/Document";

export const useFetchDocuments = (
  docCollection: string, 
  search = null, 
  uid = null
) => {
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>();

  // Leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;

        // Busca
        // Dash

        // eslint-disable-next-line prefer-const
        q = await query(collectionRef, orderBy("createdAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              body: doc.data().body, 
              title: doc.data().title,
              createdBy: doc.data().createdBy,
              image: doc.data().image,
              tagsArray: doc.data().tagsArray,
            }))
          );
        });
        
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
