import React, {useContext, useEffect, useState} from "react"
import { Link, useHistory} from "react-router-dom"
import Password from "../images/password.svg"
import Mail from "../images/mail.svg"
import { FirebaseContext } from "../context/Firebase"

import * as ROUTES from "../constants/routes"

export default function Login(){
    const [user, setUser] = useState({Email:"", Password:""})
    const [error, setError] = useState("")
    const {firebase} = useContext(FirebaseContext)
    const history = useHistory()
    const [Isvalid, setIsValid] = useState(false)

    // This tracks the onChange event on the inputs for email and password and makes it a controlled form
    const handleChange = (e) => {
        const {name,value} = e.target
        setUser(prev => ({...prev, [name]:value}))
    }
    
    //Verifies if there's and email and password for form validation
    useEffect(() => {
        setIsValid(user.Password && user.Email ? true : false)
    },[user])

    // This function calls the firebase authentication and passes in the email and password to signIN
    const handleLogin = async(e) => {
        e.preventDefault()
        setError("")
        try{
            //if the email and password are valid the user is redirected to the main page
            await firebase.auth().signInWithEmailAndPassword(user.Email, user.Password)
            history.push(ROUTES.DASHBOARD)

        }
        catch(error){
            setError(error.message)
        }
    }

    return (
        <div className="login-main">
            <div className="form-container">
                <h1>BAG</h1>
                <form className="form" method="POST" onSubmit={handleLogin}>
                    <div className="mail">
                        <input 
                            type="text" 
                            name="Email"
                            placeholder="E-mail"
                            value={user.Email}
                            onChange={handleChange}
                        />
                        <img src={Mail} alt="Mail icon"/>
                    </div>
                    <div className="password">
                        <input 
                            type="password" 
                            name="Password"
                            placeholder="Password"
                            value={user.Password}
                            onChange={handleChange}
                        />
                        <img src={Password} alt="Password icon"/>
                    </div>
                    <input
                        disabled={!Isvalid}
                        className="submit" 
                        type="submit"
                        value="Login"
                    />
                    {error && <span id="error">{error}</span>}
                </form>

                <div className="register">
                    <span>Don't have an account?</span>
                    <span>
                        <Link to="/signup">
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}