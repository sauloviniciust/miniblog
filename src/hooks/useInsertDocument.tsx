import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch ((action.type)) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection: string) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkCancelBeforeDispatch = (action: { type: string; payload: any; }) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertDocument = async (document: any) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
      payload: insertDocument,
    });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
