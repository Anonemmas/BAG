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


    const addCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const DeleteOne = async(state) => {
        const newFilter = states.filter(country => state !== country)
        setStates(newFilter)
        await DeleteCountry(user.docId, state)
    }

    useEffect(() => {
        const getCountries = () => {
            if(user){
                setStates(user.visited)
            }
        }
        getCountries()
    },[user.visited,user])

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
                )): states !== undefined && states.length <= 0 ? <p className="message">You haven't visited any places</p> : <p className="message">Please wait while it's still loading</p>}
            </div>
        </div>
    )
}