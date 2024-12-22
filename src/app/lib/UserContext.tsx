'use client'

import { decodeJWT } from "@/utils/jwtDecoder";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (Value: boolean) => void;
    userName: string;
    setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn]= useState(false);
    const [userName, setUserName] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setIsLoggedIn(!!token); //If there is a token, it will be true. otherwise, false.
        if (token) {
            // Decode the JWT and parse the username from it
            const decoded = decodeJWT();
            if (decoded) {
              let username = '';
              if (decoded.name) {
                username = decoded.name;
              }
              setUserName(username);
            }
          }
    }, []);

    // Monitor logout and navigate to the home page
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/'); // Redirect to the home page
        }
    }, [isLoggedIn]); // Re-runs only when the isLoggedIn state changes
    
    return(
        <UserContext.Provider value={ { isLoggedIn, setIsLoggedIn, userName, setUserName } }>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export { UserProvider, useUserContext };



