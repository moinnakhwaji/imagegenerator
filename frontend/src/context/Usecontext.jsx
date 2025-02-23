import { createContext, useEffect,  } from "react";
import { useState } from "react";



export const Usercontext = createContext()


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
     
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [open,setiSopen] = useState(false)

   
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <Usercontext.Provider value={{ user, setUser,open,setiSopen }}>
            {children}
        </Usercontext.Provider>
    );
};