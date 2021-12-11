import React, {useState} from "react"
import Search from "../../images/search.svg"
import { Link,useHistory } from "react-router-dom"

export default function SecondSection({states, selectValue}){

    const history = useHistory()
    const [search, setSearch] = useState("")
    const [selectedValue, setSelectedValue] = useState(selectValue)
    const [filteredCountries, setFilteredCountries] = useState([])

    /*
    This function is used to filter the countries using the current search input
    */ 
    const handleSearch = ({target}) => {
        const searchWord = target.value
        setSearch(searchWord)
        const newFilter = states.filter(state => state.name.common.toLowerCase().includes(searchWord.toLowerCase()))
        /*
        * newFilter filters countries with the exact same characters included in their names
        * And changes them to lowercase to make sure they match
        */
        if(searchWord === ''){
            setFilteredCountries([])
        }
        else if(filteredCountries){
            setFilteredCountries(newFilter)
        }
    }
    /*
    * This function is used to filter the countries from the dropdown
    * And pushes the user to the right route depending on the select value
    */ 
    const handleSelect = ({target}) => {
        const select = target.value
        setSelectedValue(select)

        if(select === 'All'){
            history.push('/')
        }
        else if(select === 'visited'){
            history.push('/visited')
        }
        else if(select === 'planning'){
            history.push('/tovisit')

        }
    }

    return (
        <div className="second-section">
                <div className="search-input">
                    <input 
                        type="text"
                        placeholder="Search For a Country..."
                        value={search}
                        onChange={handleSearch}
                    />
                    <img src={Search} alt="search icon"/>
                </div>
                {/*if the search is not empty and there are results*/}
                {filteredCountries.length > 0 && search ? (
                <div className="search-results">
                    {filteredCountries.map((country,index) => 
                    <Link key={index} to={`/country/${country.name.common.toLowerCase()}`}>
                        <img src={country.flags.png} alt={country.name.common}/>
                        <span  style={{color:"#000"}} key={index}>
                            {country.name.common}
                        </span>
                    </Link>)}
                </div>
            )/*if the search is not empty and there are no results found from the search*/
            : filteredCountries.length <= 0 && search !== "" ?
                <div className="search-results">
                    <p>No results found.</p>
                </div>
            : null
            }
                <select value={selectedValue} onChange={handleSelect}>
                    <option value="All">All</option>
                    <option value="visited">Visited</option>
                    <option value="planning">Planning</option>
                </select>
            </div>
    )
}