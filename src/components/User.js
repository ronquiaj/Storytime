import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase/Firebase';
import { } from 'react-bootstrap';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import Spinner from './Spinner';
import UserDisplay from './UserDisplay';

function User(props) {
    const { user } = props.match.params;
    const history = useHistory();
    const { currentUser, updateUser } = useContext(AuthenticatedContext);
    const [ userData, changeUserData ] = useState(null);
    const [ pageLoaded, changePageLoaded ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const userInfoRef = db.collection('users').doc(user);
            const userInfo = await userInfoRef.get();
            if (userInfo.exists) {
                changeUserData(userInfo.data());
            } else history.push('/error');
        };
        fetchData();
        changePageLoaded(true);
    }, []);

    return (
        <div>
            {pageLoaded ? 
            <UserDisplay {...userData}/>
            :
            <Spinner />
        }
            
        </div>
    )
}

export default User;