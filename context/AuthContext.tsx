import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  signIn: (token: string, userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  userToken: string | null;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  isLoading: true,
  userToken: null,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const signIn = async (token: string, userData: User) => {
    setUserToken(token);
    setUser(userData);
    setIsLoading(false);
  };

  const signOut = async () => {
    setUserToken(null);
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLoading,
        userToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}