import React, { useEffect, useState } from "react"
import Light from "../../images/light.svg"
import Moon from "../../images/moon.svg"

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false)

    const ActiveMode = async () => {
        setDarkMode(!darkMode)

        if(darkMode){
            document.body.classList.add('light_Mode')
            document.body.classList.remove('dark_Mode')
            await localStorage.setItem('Theme', 'light_Mode')
        }
        else if(!darkMode){
            document.body.classList.add('dark_Mode')
            document.body.classList.remove('light_Mode')
            await localStorage.setItem('Theme', 'dark_Mode')
        }
    }
    
    useEffect(() => {
        if(localStorage.getItem('Theme') === 'light_Mode'){
            document.body.classList.add('light_Mode')
        }
        else if(localStorage.getItem('Theme') === 'dark_Mode'){
            document.body.classList.add('dark_Mode')
            setDarkMode(!darkMode)
        }
    }, [])
    
    

    return (
        <>
        <div className="darkmode" onClick={ActiveMode}>
            <span>DARK MODE</span>
            <div className="outer-container">
                <div className="inner-div"></div>
            </div>
        </div>
        <div className="darkmode-mobo" onClick={ActiveMode}>
            {darkMode ? 
            <>
                <img src={Light} alt="moon" />
                <span>LIGHT MODE</span>
            </>
            :
            <>
                <img src={Moon} alt="moon" />
                <span>DARK MODE</span>
            </>
            }
            
        </div>
        </>
    )
}

export default DarkMode