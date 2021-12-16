import React, {useState,useContext, useEffect}from "react"
import {Link,useHistory} from "react-router-dom"
import { FirebaseContext } from "../context/Firebase"
// import { firebase } from "../lib/Firebase"
import { doesUsernameExist } from "../services/Firebase"
import * as ROUTES from "../constants/routes"

export default function SignUp(){
    const history = useHistory()
    const {firebase} = useContext(FirebaseContext)
    const [newUser, setNewUser] = useState({FirstName: "",LastName:"",Username:"",Email:"",PhoneNumber:"",
        Country:"",Password:""})
    const[error, setError] = useState('')
    const [valid, setValid] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewUser(prev => ({...prev, [name]:value}))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError("")

        const doesUsernameExistResult = await doesUsernameExist(newUser.Username)
        if(doesUsernameExistResult && doesUsernameExistResult.length === 0){
            try{

            const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(newUser.Email, newUser.Password)

            await createdUserResult.user.updateProfile({
                displayName: newUser.Username
            })

            console.log(createdUserResult.user)

            await firebase.firestore().collection('users').add({
                userId: createdUserResult.user.uid,
                FirstName:newUser.FirstName,
                LastName:newUser.LastName,
                Username: newUser.Username.toLocaleLowerCase(),
                Email: newUser.Email.toLocaleLowerCase(),
                PhoneNumber: newUser.PhoneNumber,
                Country: newUser.Country,
                dateCreated: Date.now(),
                planning:[],
                visited:[]
            })

            history.push(ROUTES.DASHBOARD)
            setNewUser("")
        }
            catch(error){
                setError(error.message)
            }
        }
        else {
            setError('That username is already taken, please try another.');
        } 
    }

    useEffect(() => {
        setValid(newUser.FirstName && newUser.LastName && newUser.Password && newUser.Username && newUser.Email &&
        newUser.PhoneNumber && newUser.Country ? true : false)
    }, [newUser])


        return (
            <div className="signup-main">
                <div className="form-container">
                    <h1>BAG</h1>
                    <p>Create an account here!</p>
                    <form className="form" method='POST' onSubmit={handleSignUp}>
                        <input 
                            type="text" 
                            name="FirstName" 
                            value={newUser.FirstName} 
                            onChange={handleChange} 
                            placeholder="First Name"
                        />
                        <input 
                            type="text" 
                            name="LastName" 
                            value={newUser.LastName} 
                            onChange={handleChange} 
                            placeholder="Last Name"
                        />
                        <input 
                            type="text" 
                            name="Username" 
                            value={newUser.Username} 
                            onChange={handleChange} 
                            placeholder="username"
                        />
                        <input 
                            type="text" 
                            name="Email" 
                            value={newUser.Email} 
                            onChange={handleChange} 
                            placeholder="Email"
                        />
                        <input 
                            type="text" 
                            name="PhoneNumber" 
                            value={newUser.PhoneNumber} 
                            onChange={handleChange} 
                            placeholder="Phone Number"
                        />
                        <input 
                            type="text" 
                            name="Country" 
                            value={newUser.Country} 
                            onChange={handleChange} 
                            placeholder="Country"
                        />
                        <input 
                            type="password" 
                            name="Password" 
                            value={newUser.Password} 
                            onChange={handleChange} 
                            placeholder="Password"
                        />
                        <input 
                            className="submit" 
                            type="submit" 
                            value="Register"
                            disabled={!valid}
                        />
                        {error && <span id="error">{error}</span>}
                    </form>
                    <div className="login">
                        <span>Have an account?</span>
                        <span>
                            <Link to="/login">
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        )
}
