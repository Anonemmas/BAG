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
            const [response] = await getUserByUserId(user.uid)
            setActiveUser({...response})
            
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