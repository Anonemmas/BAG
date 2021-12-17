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

    const addCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
                            <img src={Check} alt="check icon" onClick={() => AddCountry(user.docId, state)
                            .then(alert("Added to Planning successfully"))}/>
                        </div>
                    </div>
                )): <p className="message">Please wait it's still loading</p>}
            </div>
        </div>
    )
}