import { createContext, useContext, useEffect, useState } from "react";



const ThemeContext = createContext('light')

export const ThemeProvider = ({children}) => {
     
    const [darkMode, setDarkMode] =useState(
        localStorage.getItem("theme") === "dark"
    )
    
    useEffect(() => {
         if(darkMode){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
         }else{
             document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
         }
    }, [darkMode])

      return (
        <ThemeContext value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext>
      )
} 

export const useDarkMode = () => useContext(ThemeContext);