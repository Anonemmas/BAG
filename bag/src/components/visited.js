import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import TopNavLinks from "./reusable/topnavlinks"
import Trash from "../images/trash.svg"
import useUser from "../hooks/use-User"
import SecondSection from "./reusable/secondsection"
import { DeleteCountry, DeleteAllCountries } from "../services/Firebase"

export default function Visited(){
    const {user} = useUser()
    const [states, setStates] = useState([])

    // function that adds commas to thousandths numbers(e.g 1000 to 1,000)
    const addCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // Deletes the selected country from the countries the current user has visited
    const DeleteOne = async(state) => {
        const newFilter = states.filter(country => state !== country)
        setStates(newFilter)
        await DeleteCountry(user.docId, state)
    }

    useEffect(() => {
        const getCountries = () => {
            // if the user is present then set the state to the user's visited countries
            if(user){
                setStates(user.visited)
            }
        }
        getCountries()
    },[user.visited,user])

    //This function clears all the countries in the visited array
    const clearCountries = async() => {
        setStates([])
        await DeleteAllCountries(user.docId)
    }

    return (
        <div className="my-list">
            <div className="topNav">
                <div className="page-title">
                    <h2>VISITED</h2>
                </div>
                <TopNavLinks user={user}/>
            </div>
            <SecondSection states={states} selectValue='visited'/>
            <div className="clear">
                <button onClick={clearCountries} id="clear">Clear All Countries</button>
            </div>
            <div className="countries-section">
                {/* Checks if there's a user and the visited array is not empty map over the array */}
                { states !== undefined && states.length > 0 ? states.map((state, index) => (
                        <div className="country" key={index}>
                            <Link to={`/country/${state.name.common.toLowerCase()}`}>
                                <img src={state.flags.png} alt={state.name.common}/>
                                <h3>{state.name.common}</h3>
                                <p>
                                    <span>Population: {addCommas(state.population)}</span>
                                    <span>Capital: {state.capital ? state.capital : "-"}</span>
                                </p>
                            </Link>
                            <div className="actions">
                                <img src={Trash} alt="trash icon" onClick={() => DeleteOne(state)}/>
                            </div>
                        </div>
                )): states !== undefined && states.length <= 0 ?  // if there's a states array and it is empty
                 <p className="message">You haven't visited any places</p> : <p className="message">Please wait while it's still loading</p>}
            </div>
        </div>
    )
}