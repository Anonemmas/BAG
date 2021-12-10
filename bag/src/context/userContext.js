import React,{ createContext } from "react";
import useAuthListener from "../hooks/use-auth-listener";

const userContext = createContext()

function UserContextProvider(props){
    const {user} = useAuthListener()
    return(
        <userContext.Provider value={{user}}>
            {props.children}
        </userContext.Provider>
    )
}

export{UserContextProvider, userContext}