
import { createContext } from "react";
import { firebase, FieldValue } from "../lib/Firebase";

const FirebaseContext = createContext()

function FirebaseContextProvider(props){
    return(
        /*
        * This is to add the Firebase to the entire app easily without prop drilling
        * In this context we are going to wrap this around the top element in the index.js
        */ 
        <FirebaseContext.Provider value={{firebase, FieldValue}}>
            {/* All the children of this parent can access firebase and Fieldvalue from firebase */}
            {props.children} 
        </FirebaseContext.Provider>
    )
}

export {FirebaseContextProvider, FirebaseContext}