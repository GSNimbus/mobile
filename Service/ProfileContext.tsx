import { createContext, ReactNode, useState } from "react";

interface ProfileContextData {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<ProfileContextData>({
    userId : null,
    setUserId: () => {},
    token: null,
    setToken: () => {},
});

type ProfileProviderProps = {
  children: ReactNode;
};

export function ProfileContext({children} : ProfileProviderProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
