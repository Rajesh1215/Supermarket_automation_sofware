import React, { createContext, useContext, useState } from 'react';


// Create a context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {

    const [User,setUser]=useState({
        username:"",
        status:"",
        id:-1,
    });


    return (
        <UserContext.Provider value={{
            User,setUser,
        }}>        
        {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to consume the context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
