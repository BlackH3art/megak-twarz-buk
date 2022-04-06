import { createContext, FC, useContext, useState, Dispatch, SetStateAction } from 'react';

interface UserContextValue {
    authorization: boolean;
    setAuthorization: Dispatch<SetStateAction<boolean>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextValue>(null!);

export const useUser = () => useContext(UserContext);

export const UserProvider: FC = ({ children }) => {

    const [authorization, setAuthorization] = useState(false);
    const [userId, setUserId] = useState('');

    return (
        <UserContext.Provider value={{ authorization, setAuthorization, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};