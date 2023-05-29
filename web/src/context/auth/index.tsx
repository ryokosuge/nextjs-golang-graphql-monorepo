"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  inMemoryPersistence,
} from "firebase/auth";
import { app } from "@/firebase/client";

const AuthContext = createContext<{
  user: User | null;
  login: () => Promise<void>;
}>({ user: null, login: async () => {} });

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(`onAuthStateChanged => ${JSON.stringify(user, null, 4)}`);
      if (user == null) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      console.log(`onIdTokenChange => ${JSON.stringify(user, null, 4)}`);
      if (user == null) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
    return unsubscribe;
  }, [auth]);

  const login = useCallback(async () => {
    await auth.setPersistence(inMemoryPersistence);
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log(result);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    console.log(result.user);
    setUser(result.user);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
