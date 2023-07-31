import { createContext, useEffect, useState } from "react"

export const ProteinContext = createContext()

export const ProteinContextProvider = ({ children }) => {
    
    const [ proteinIntake, setProteinIntake ] = useState('')

    useEffect(() => {
        setProteinIntake() 
    }, [ setProteinIntake ])

    return (
        <ProteinContext.Provider value={{ setProteinIntake, proteinIntake }}>
            { children }
        </ProteinContext.Provider>
    )
}