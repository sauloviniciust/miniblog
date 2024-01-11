import { ReactNode, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { QuerySnapshot, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";


export const useFetchDocuments = (
    docCollection: unknown, search = null, uid = null) => {
        const [documents, setDocuments] = useState<ReactNode>();
        const [error, setError] = useState<string | null>();
        const [loading, setLoading] = useState<boolean>();

        //leak
        const [cancelled, setCancelled] = useState(false);

        useEffect(() => {
             
            async function loadData() {
                if (cancelled) return
                setLoading(true)

                const collectionRef = await collection(db, docCollection)

                try {
                    let q 

                    //busca
                    //dash


                    q = await query(collectionRef, orderBy(
                        "createdAt", "desc"));

                    await onSnapshot(q, (querySnapshot) => {

                        setDocuments(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }))
                        )
                    });
                    setLoading(false);
                } 
                
                catch (error) {
                    console.log(error);
                    setError(error.message);

                    setLoading(false);
                }
                
            }

                loadData();

        }, [docCollection, search, uid, cancelled])

        useEffect(() =>{
            return () => setCancelled(true); 
        },[])
        return { documents, loading, error };
    };
