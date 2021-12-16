// eslint-disable-next-line no-unused-vars
import {firebase, FieldValue} from "../lib/Firebase"

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

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    return result.docs.map((user) => user.data().length > 0);
}

export async function AddCountry(docId, country){
    return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
        planning: FieldValue.arrayUnion(country)
    })
}

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

export async function DeleteAllCountries(docId){
    return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
        visited:[]
    })
}

export async function User(userId){
    const result = firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

    const user = result.docs.map(user => ({
        ...user.data(),
        docId:user.id
    }))
    
    return user
    
}