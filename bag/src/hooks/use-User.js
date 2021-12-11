//This is a custom hook that tracks the logged in user

import { useState, useEffect, useContext } from "react";
import { getUserByUserId } from '../services/Firebase';
import { userContext } from "../context/userContext";
import { FirebaseContext } from "../context/Firebase";

export default function useUser(){
    const [activeUser, setActiveUser] = useState({})
    const {user} = useContext(userContext)
    const {firebase} = useContext(FirebaseContext)

    useEffect(() => {
        async function getUserObjByUserId(){
            const [response] = await getUserByUserId(user.uid) // this function is explained in the services
            setActiveUser({...response})

            //Current user is a variable provided from firebase authentication that tracks the current user 
            const currentUser = firebase.auth().currentUser 
                if(currentUser & !currentUser.displayName){
                    currentUser.updateProfile({
                        displayName:activeUser.username
                    }).then(() => console.log("User updated"))
                    .catch((error) => console.log(error))
                }
        }
        if(user && user.uid){
            getUserObjByUserId()
        }
    },[user, activeUser.username, firebase])

    return {user: activeUser}
}