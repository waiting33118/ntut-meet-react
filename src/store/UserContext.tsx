import { useState, Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

type UserInfo = {
  userInfo: IUser;
  setUserInfo: Dispatch<SetStateAction<IUser>>;
};

interface IUser {
  username: string;
  localStream: MediaStream | null;
}

export const UserContext = createContext<UserInfo | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = (props: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<IUser>({
    username: '',
    localStream: null
  });
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserContext.Provider>
  );
};
