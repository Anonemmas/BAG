import React,{ createContext } from "react";
import useAuthListener from "../hooks/use-auth-listener";

const userContext = createContext()

function UserContextProvider(props){
    const {user} = useAuthListener()
    return(
        /*
        * This is to add the authorized user to needed parts of the app easily without prop drilling
        * In this context we are going to wrap this around the top element in the App.js
        */ 
        <userContext.Provider value={{user}}>
            {/* All the children of this parent can access the logged in user */}
            {props.children}
        </userContext.Provider>
    )
}

export{UserContextProvider, userContext}