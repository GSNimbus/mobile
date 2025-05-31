import { createContext, ReactNode, useState } from "react";
import { userResponse } from "../util/interfaces";

interface ProfileContextData {
  user: userResponse | null;
  setUser: React.Dispatch<React.SetStateAction<userResponse | null>>;
}

export const AuthContext = createContext<ProfileContextData>({
    user : null, 
    setUser: () => {},
});

type ProfileProviderProps = {
  children: ReactNode;
};

export function ProfileContext({children} : ProfileProviderProps) {
  const [user, setUser] = useState<userResponse | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
