//This component is for listening for changes when user logged in or out from the localstorage

import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/Firebase";

export default function useAuthListener(){
    // sets the authUser from localstorage and convert it into an object
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const {firebase} = useContext(FirebaseContext)

    useEffect(() => {
        // This function listens if the authUser changed and sets the authUser item in the localstorage
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            //authUser provides the authUser when the user signs in
            if(authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }
            else {
                 //if there's no user there's no user logged in therefore the user is set to null
                localStorage.removeItem('authUser')
                setUser(null)
            }
        });
        return () => listener(); // this removes the listener from useEffect so as not to cause a memory leak
    }, [firebase])

    return {user} //This user is used to verify if there's a user logged in across the app
}