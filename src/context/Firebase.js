import { createContext } from "react";
import { firebase, FieldValue } from "../lib/Firebase";

const FirebaseContext = createContext()

function FirebaseContextProvider(props){
    return(
        <FirebaseContext.Provider value={{firebase, FieldValue}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export {FirebaseContextProvider, FirebaseContext}