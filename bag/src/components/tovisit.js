//This is the planning to visit component

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
    
    // function that adds commas to thousandths numbers(e.g 1000 to 1,000)
    const addCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /*
    * This function takes in the current user and the state selected and adds the state to the user's document
    visted countries
    * Adds the country to visited and sets the new state to countries 
    * not visited yet but are planned to visit 
    */ 
    const handleAddVisited = async(state) =>{
        if(state){
        await AddToVisited(user.docId, state)
        const newRender = states.filter(country => country !== state)
        setStates(newRender)
        }
        
    }
    // Deletes the selected country from the countries the current user plans to visit
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
            // if the user is present then set the state to the user's planned to visit countries
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
                {/* Checks if there's a user and the planned array is not empty map over the array */}
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
                                <img src={Check} alt="trash icon" onClick={() => handleAddVisited(state).then(alert('Added to Visited'))}/>
                            </div>
                        </div>
                )): 
                states !== undefined && states.length <= 0 ? // if there's a states array and it is empty
                <p className="message">You haven't Added any places to visit</p> : <p>Please wait while it's still loading</p>}
            </div>
        </div>
    )
}