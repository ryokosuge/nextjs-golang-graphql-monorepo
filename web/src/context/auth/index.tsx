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
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  inMemoryPersistence,
} from "firebase/auth";
import { app } from "@/firebase/client";
import { deleteSession, revokeSession, storeSession } from "@/actions/session";
import { User as AppUser } from "@/graphql/type";
import { createUser } from "@/actions/graphql/user";

type User = {
  firebase: FirebaseUser;
  app: AppUser;
};

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

      (async function (user: FirebaseUser) {
        const idToken = await user.getIdToken();
        await storeSession(idToken);
        const appUser = await createUser({
          name: user.displayName ?? "",
          email: user.email ?? "",
          firebaseuuid: user.uid,
        });
        setUser({ firebase: user, app: appUser });
      })(user);
    });
    return unsubscribe;
  }, [auth]);

  const login = useCallback(async () => {
    await auth.setPersistence(inMemoryPersistence);
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const idToken = await result.user.getIdToken();
    await storeSession(idToken);
    const appUser = await createUser({
      name: result.user.displayName ?? "",
      email: result.user.email ?? "",
      firebaseuuid: result.user.uid,
    });
    setUser({ firebase: result.user, app: appUser });
  }, [auth]);

  const logout = useCallback(async () => {
    await auth.signOut();
    await revokeSession();
    await deleteSession();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
