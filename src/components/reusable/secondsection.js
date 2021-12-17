import React, {useState} from "react"
import Search from "../../images/search.svg"
import { Link,useHistory } from "react-router-dom"

export default function SecondSection({states, selectValue}){

    const history = useHistory()
    const [search, setSearch] = useState("")
    const [selectedValue, setSelectedValue] = useState(selectValue)
    const [filteredCountries, setFilteredCountries] = useState([])

    const handleSearch = ({target}) => {
        const searchWord = target.value
        setSearch(searchWord)
        const newFilter = states.filter(state => state.name.common.toLowerCase().includes(searchWord.toLowerCase()))
        if(searchWord === ''){
            setFilteredCountries([])
        }
        else if(searchWord){
            setFilteredCountries(newFilter)
        }
    }

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
            )
            : filteredCountries.length <= 0 && search !== "" ?
                <div className="search-results">
                    <span style={{color:"#000"}}>No results found</span>
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