import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from "../firebase/Firebase";
import Spinner from './Spinner';
import UserDisplay from './UserDisplay';

function User(props) {
    const { user } = props.match.params;
    const history = useHistory();
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
    }, [user, history]); // eslint-disable-next-line react-hooks/exhaustive-deps

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