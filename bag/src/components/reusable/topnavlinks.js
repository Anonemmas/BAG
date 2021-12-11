import React from "react"
import Bell from "../../images/bell.svg"
import NoImage from "../../images/No-Image.jpg"
import DarkMode from "./darkmode.js"


export default function TopNavLinks({user}){
    return (
        <>
            <div className="topNav-links">
                <DarkMode />
                <img id="bell" src={Bell} alt="bell icon"/>
                {/* If there's a user then render the user's firstname */}
                {user &&
                <div className="user-info">
                    <span>Hey, {user.FirstName}</span>
                    <img src={NoImage} alt="Jane"/>
                </div>
                }
            </div>
            <div className="topNav-links-mobo">
                <h2>Where in the world?</h2>
                <DarkMode />
            </div>
        </>
    )
}
