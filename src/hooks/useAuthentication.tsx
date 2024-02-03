import { db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState<string | boolean>("");
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data: {
    email: string;
    password: string;
    displayname?: string;
  }) => {
    checkIfIsCancelled();

    setLoading(true);
    setError("");
    console.log(db);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayname,
      });

      setLoading(false);

      return user;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let systemErrorMessage;

      if (error.message.includes("password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setLoading(false);

      setError(systemErrorMessage);
    }
  };

  //logout
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
    
  };



  //login
  const login = async(data: { email: string; password: string; }) => {

    checkIfIsCancelled();
    setLoading(true);
    setError(false)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuario não encontrado."
      } else if  (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."

    } else {
      systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
  }

    setError(systemErrorMessage);
    setLoading(false);
}

  }
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };
};
