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
import { revokeSession, storeSession } from "@/actions/session";

const AuthContext = createContext<{
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}>({ user: null, login: async () => {}, logout: async () => {} });

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user == null) {
        setUser(null);
        return;
      }

      (async function (user: User) {
        const idToken = await user.getIdToken();
        await storeSession(idToken);
        setUser(user);
      })(user);
    });
    return unsubscribe;
  }, [auth]);

  const login = useCallback(async () => {
    await auth.setPersistence(inMemoryPersistence);
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const idToken = await result.user.getIdToken();
    await storeSession(idToken);
    setUser(result.user);
  }, [auth]);

  const logout = useCallback(async () => {
    await auth.signOut();
    await revokeSession();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
