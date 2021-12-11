// eslint-disable-next-line no-unused-vars
import {firebase, FieldValue} from "../lib/Firebase"

// Gets a specific user by the UserId property added to the user by firebase when the user signsUp 
export async function getUserByUserId(userId){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

    const user = result.docs.map(item => ({
        ...item.data(),
        docId:item.id
    }))

    return user
}

//Function to check if the user exists by filtering the database using the username
export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    return result.docs.map((user) => user.data().length > 0);
}
/* docId is the current user's documentId and country is the specific country that is used to add the country 
to the planning array in the user's document in firebase */
export async function AddCountry(docId, country){
    return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
        planning: FieldValue.arrayUnion(country)
    })
}
/*This function is for adding a country to the visited array in a user's document and removes the country from 
planning to visit */
export async function AddToVisited(docId, country){
    return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
        visited: FieldValue.arrayUnion(country),
        planning:FieldValue.arrayRemove(country)
    })
}
/* This function removes the country from the planning array or the visited array*/
export async function DeleteCountry(docId, country){
    return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
        planning: FieldValue.arrayRemove(country),
        visited:FieldValue.arrayRemove(country)
    })
}

//Function that erases all the countries from the visited list
export async function DeleteAllCountries(docId){
    return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
        visited:[]
    })
}
