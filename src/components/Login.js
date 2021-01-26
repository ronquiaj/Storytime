import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import useForm from '../hooks/useForm';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import LoginForm from './LoginForm';

export default function Signin() {
    const [emailRef, changeEmailRef] = useForm("");
    const [passwordRef, changePasswordRef] = useForm("");
    const {user, updateUser} = useContext(AuthenticatedContext);
    const [alert, changeAlert] = useState("");
    const history = useHistory();
    const handleClick = e => {
        e.preventDefault();
            auth.signInWithEmailAndPassword(emailRef, passwordRef).then(() => {
                const currentUser = auth.currentUser;
                updateUser(currentUser);
                history.push('/');
                console.log("Successfully signed back in");
            }).catch(() => {
                changeAlert("Invalid password")
            });   

    };

    // Used to prevent signed in user from accessing this page
    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [user, history]);

    return <LoginForm changeAlert={changeAlert} handleClick={handleClick} emailRef={emailRef} changeEmailRef={changeEmailRef} passwordRef={passwordRef} changePasswordRef={changePasswordRef} alert={alert}/>
}
