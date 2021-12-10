import React, { useContext } from "react"
import { Link } from "react-router-dom"
import * as ROUTES from '../constants/routes'
import { FirebaseContext } from "../context/Firebase"

export default function SideBar(){

    const {firebase} = useContext(FirebaseContext)
    return (
        <div className="sidebar">
            <div className="logo">
                <Link to={ROUTES.DASHBOARD}><h1>BAG</h1></Link>
            </div>
            <div className="sidenav">
                <ul>
                    <Link to={"/"}>
                        <li>ALL</li>
                    </Link>
                    <Link to={ROUTES.TOVISIT}>
                        <li>PLANNING</li>
                    </Link>
                    <Link to={ROUTES.VISITED}>
                        <li>VISITED</li>
                    </Link>
                </ul>
            </div>
            <Link
            onClick={() => {
                firebase.auth().signOut()
                .then(() => console.log('Logged out'))
                .catch(error => console.log(error))
            }}
            to={ROUTES.LOGIN}
            >
                <button>Sign Out</button>
            </Link>
        </div>
    )
}