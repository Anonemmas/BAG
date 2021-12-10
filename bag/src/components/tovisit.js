import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import TopNavLinks from "./reusable/topnavlinks"
import Trash from "../images/trash.svg"
import Check from "../images/check.svg"
import useUser from "../hooks/use-User"
import SecondSection from "./reusable/secondsection"
import { AddToVisited,DeleteCountry } from "../services/Firebase"

export default function ToVisit(){
    const {user} = useUser()
    const [states, setStates] = useState([])
    
    const addCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    
    const handleAddVisited = async(state) =>{
        if(state){
        await AddToVisited(user.docId, state)
        const newRender = states.filter(country => country !== state)
        setStates(newRender)
        }
        
    }

    const deleteCountry = async(state) => {
        if(state){
            await DeleteCountry(user.docId, state)
            const newRender = states.filter(country => country !== state)
            setStates(newRender)
        }
    }

    useEffect(() => {
        handleAddVisited()
    }, [states])
     
    useEffect(() => {
        const getCountries = () => {
            if(user){
                setStates(user.planning)
            }
        }
        getCountries()
    },[user])
    

    return (
        <div className="my-list">
            <div className="topNav">
                <div className="page-title">
                    <h2>PLANNING</h2>
                </div>
                <TopNavLinks user={user}/>
            </div>
           <SecondSection states={states} selectValue='planning'/>
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
                                <img src={Trash} alt="trash icon" onClick={() => deleteCountry(state)}/>
                                <img src={Check} alt="trash icon" onClick={() => handleAddVisited(state)}/>
                            </div>
                        </div>
                )): states !== undefined && states.length <= 0 ? <p className="message">You haven't Added any places to visit</p> : <p>Please wait while it's still loading</p>}
            </div>
        </div>
    )
}