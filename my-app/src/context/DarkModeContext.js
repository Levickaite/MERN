import React, {createContext, useEffect, useState} from "react";

const DarkModeContext = createContext()

function DarkModeProvider({children}){
    const [darkMode, setDarkMode] = useState(()=>{
        const saved = localStorage.getItem("darkMode")
        return saved ? JSON.parse(saved) : false
    })
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev)
    }

    useEffect(()=>{
        if(darkMode){
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode))
    }, [darkMode])
    return (
        <div>
            <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
                {children}
            </DarkModeContext.Provider>
        </div>
    )
}

export {DarkModeContext, DarkModeProvider}