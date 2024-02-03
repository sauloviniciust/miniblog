import { User } from "firebase/auth";
import { ReactNode, createContext, useContext } from "react";

interface IProps {
  children: ReactNode;
  value: { user: User | null }; // Use o tipo User fornecido pelo Firebase
}

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children, value }: IProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
