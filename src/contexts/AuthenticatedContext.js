import { useState, createContext, useEffect } from 'react';
import { auth } from '../firebase/Firebase';

export const AuthenticatedContext = createContext();

export function AuthenticatedProvider(props) {
    const [user, changeUser] = useState();
    const updateUser = newUser => {
        changeUser(newUser);
    };

     // useEffect is used on mount
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        changeUser(user);
    });

    return unsubscribe;
}, []);

    return (
        <AuthenticatedContext.Provider value={{user, updateUser}}>
            {props.children}
        </AuthenticatedContext.Provider>
    )
}
