import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import TopNavLinks from "./reusable/topnavlinks"
import Check from "../images/check.svg"
import useUser from "../hooks/use-User"
import SecondSection from "./reusable/secondsection"
import { AddCountry } from "../services/Firebase"

export default function MyList(){
    const [states, setStates] = useState([])
    const {user} = useUser()

    // Function that adds a comma after thousandths
    const addCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Getting countries from the api and setting the state to the countries fetched
    useEffect(() => {
        const getCountries = async () => {
            const resp = await fetch(`https://restcountries.com/v3.1/all`)
            const states = await resp.json()
            setStates(states)
        }
        getCountries()
    },[user])

    return (
        <div className="my-list">
            <div className="topNav">
                <div className="page-title">
                    <h2>ALL</h2>
                </div>
                <TopNavLinks user={user}/>
            </div>
            <SecondSection states={states} user={user} selectValue="All"/>
            
            <div className="countries-section">
                {/* If there are states and the user.visited array is present then map over the array
                * This eliminates the case where the states.map renders the array before it's updated
                */}
                { states && user.visited ? states.map((state, index) => (
                    <div className="country" key={index}>
                        <Link to={`/country/${state.name.common.toLowerCase()}`}>
                            <img src={state.flags.svg} alt={state.name.common}/>
                            <h3>{state.name.common}</h3>
                            <p>
                                <span>Population: {addCommas(state.population)}</span>
                                <span>Capital: {state.capital ? state.capital : "-"}</span>
                            </p>
                        </Link>
                        <div className="actions">
                            {/*OnClick of this element the country clicked will be added to the current
                              *  user's countries planned to visit array
                            */}
                            <img src={Check} alt="check icon" onClick={() => AddCountry(user.docId, state)
                            .then(alert("Added to planning Successfully"))}/>
                        </div>
                    </div>
                )): <p className="message">Please wait it's still loading</p>}
            </div>
        </div>
    )
}